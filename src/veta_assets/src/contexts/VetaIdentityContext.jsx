import { useState, useEffect, useContext, createContext } from 'react';
import {
  createVetaWalletActor,
  createAnonymousActor,
  getVetaWalletActor,
  clearActor,
} from '../services/actor';
import { setEncryptionKey } from '../utils/crypto';

export const VetaIdentityContext = createContext({
  principal: '',
});

// Determine the II identity provider URL.
// Points to the II frontend canister, not the backend.
function getIdentityProviderUrl() {
  const host = window.location.hostname;
  const isLocal =
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host.endsWith('.localhost');
  return isLocal ? 'http://id.ai.localhost:8000' : 'https://id.ai';
}

export const VetaIdentityProvider = (props) => {
  const { children } = props;
  const [pending, setPending] = useState(true);
  const [principal, setPrincipal] = useState('');
  const [vetaWallet, setVetaWallet] = useState(undefined);
  const [client, setClient] = useState();

  const initAuth = async () => {
    try {
      const { AuthClient } = await import('@icp-sdk/auth/client');
      const authClient = await AuthClient.create();
      const isAuthenticated = await authClient.isAuthenticated();

      setClient(authClient);

      if (isAuthenticated) {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal();
        setPrincipal(principal);
        setEncryptionKey(principal);
        await createVetaWalletActor(identity);
        await handleVetaProfile(principal);
      } else {
        // Create anonymous actor for public queries (shared profiles, etc.)
        await createAnonymousActor();
      }
    } catch (e) {
      console.warn('Auth init failed (expected without IC replica):', e.message);
    }
    setPending(false);
  };

  const signInByICProvider = async (callback) => {
    if (!client) {
      // Fallback for dev without IC replica
      const mockPrincipal = 'dev-' + Math.random().toString(36).slice(2, 10);
      setPrincipal(mockPrincipal);
      if (callback) callback();
      return;
    }

    const { identity, principal } = await new Promise((resolve, reject) => {
      client.login({
        identityProvider: getIdentityProviderUrl(),
        maxTimeToLive: BigInt(8) * BigInt(3_600_000_000_000), // 8 hours
        onSuccess: () => {
          const identity = client.getIdentity();
          const principal = identity.getPrincipal();
          resolve({ identity, principal });
        },
        onError: reject,
      });
    });

    setPrincipal(principal);
    setEncryptionKey(principal);
    await createVetaWalletActor(identity);
    await handleVetaProfile(principal);
    if (callback) {
      callback();
    }
  };

  const handleVetaProfile = async (principal) => {
    try {
      const actor = getVetaWalletActor();
      if (!actor) return;
      const vetaProfile = await actor.get(principal);
      setVetaWallet(vetaProfile);
    } catch (e) {
      console.warn('Failed to fetch wallet profile:', e);
    }
  };

  const refreshWallet = async () => {
    try {
      const actor = getVetaWalletActor();
      if (!actor || !principal) return;
      const vetaProfile = await actor.get(principal);
      setVetaWallet(vetaProfile);
    } catch (e) {
      console.warn('Failed to refresh wallet:', e);
    }
  };

  const signOut = async () => {
    if (client) {
      await client.logout();
    }
    clearActor();
    setEncryptionKey(null);
    setPrincipal('');
    setVetaWallet(undefined);
  };

  useEffect(() => {
    initAuth();
  }, []);

  return (
    <VetaIdentityContext.Provider
      value={{
        client,
        principal,
        signOut,
        signInByICProvider,
        vetaWallet,
        refreshWallet,
      }}>
      {!pending && children}
    </VetaIdentityContext.Provider>
  );
};

const useVetaIdentity = () => useContext(VetaIdentityContext);
export default useVetaIdentity;

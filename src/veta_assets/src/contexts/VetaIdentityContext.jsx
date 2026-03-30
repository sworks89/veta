import { useState, useEffect, useContext, useCallback, createContext } from 'react';
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
function getIdentityProviderUrl() {
  const host = window.location.hostname;
  const isLocal =
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host.endsWith('.localhost');
  return isLocal ? 'http://id.ai.localhost:8000' : 'https://id.ai';
}

// Session duration in nanoseconds (8 hours) and milliseconds
const SESSION_DURATION_NS = BigInt(8) * BigInt(3_600_000_000_000);
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;
const SESSION_WARNING_MS = 10 * 60 * 1000; // warn 10 minutes before expiry

export const VetaIdentityProvider = (props) => {
  const { children } = props;
  const [pending, setPending] = useState(true);
  const [principal, setPrincipal] = useState('');
  const [vetaWallet, setVetaWallet] = useState(undefined);
  const [client, setClient] = useState();
  const [sessionExpiry, setSessionExpiry] = useState(null);
  const [sessionExpired, setSessionExpired] = useState(false);

  // ── Session expiry timer ──────────────────────────────────────────

  useEffect(() => {
    if (!sessionExpiry) return;

    const warningTimeout = setTimeout(() => {
      // Session about to expire — check if still authenticated
      if (client) {
        client.isAuthenticated().then((isAuth) => {
          if (!isAuth) {
            handleSessionExpired();
          }
        });
      }
    }, Math.max(0, sessionExpiry - Date.now() - SESSION_WARNING_MS));

    const expiryTimeout = setTimeout(() => {
      handleSessionExpired();
    }, Math.max(0, sessionExpiry - Date.now()));

    return () => {
      clearTimeout(warningTimeout);
      clearTimeout(expiryTimeout);
    };
  }, [sessionExpiry, client]);

  const handleSessionExpired = useCallback(() => {
    setSessionExpired(true);
    clearActor();
    setEncryptionKey(null);
    setPrincipal('');
    setVetaWallet(undefined);
    setSessionExpiry(null);
  }, []);

  // ── Auth init ─────────────────────────────────────────────────────

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
        setSessionExpiry(Date.now() + SESSION_DURATION_MS);
        await createVetaWalletActor(identity);
        await handleVetaProfile(principal);
      } else {
        await createAnonymousActor();
      }
    } catch (e) {
      console.warn('Auth init failed:', e.message);
      // In production, don't fall back to mock — leave unauthenticated
      if (import.meta.env.DEV) {
        console.info('Dev mode: auth unavailable, app will run without canister connection');
      }
    }
    setPending(false);
  };

  // ── Login ─────────────────────────────────────────────────────────

  const signInByICProvider = async (callback) => {
    // Only allow mock auth in development
    if (!client) {
      if (import.meta.env.DEV) {
        const mockPrincipal = 'dev-' + Math.random().toString(36).slice(2, 10);
        setPrincipal(mockPrincipal);
        setEncryptionKey({ toString: () => mockPrincipal });
        if (callback) callback();
        return;
      }
      throw new Error('Authentication service unavailable');
    }

    setSessionExpired(false);

    const { identity, principal } = await new Promise((resolve, reject) => {
      client.login({
        identityProvider: getIdentityProviderUrl(),
        maxTimeToLive: SESSION_DURATION_NS,
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
    setSessionExpiry(Date.now() + SESSION_DURATION_MS);
    await createVetaWalletActor(identity);
    await handleVetaProfile(principal);
    if (callback) {
      callback();
    }
  };

  // ── Profile fetch ─────────────────────────────────────────────────

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

  // ── Logout ────────────────────────────────────────────────────────

  const signOut = async () => {
    if (client) {
      await client.logout();
    }
    clearActor();
    setEncryptionKey(null);
    setPrincipal('');
    setVetaWallet(undefined);
    setSessionExpiry(null);
    setSessionExpired(false);
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
        sessionExpired,
      }}>
      {!pending && children}
    </VetaIdentityContext.Provider>
  );
};

const useVetaIdentity = () => useContext(VetaIdentityContext);
export default useVetaIdentity;

import { useState, useEffect, useContext, useRef, createContext, FC } from 'react';
// import AppLoader from '../Components/AppLoader/AppLoader';
import { AuthClient } from '@dfinity/auth-client';
import { veta } from '../../../declarations/veta';
import { vetawallet } from '../../../declarations/vetawallet';
import { vetacenter } from '../../../declarations/vetacenter';
// import { Principal } from '@dfinity/principal';

export const VetaIdentityContext = createContext({
	principal: '',
});

export const VetaIdentityProvider = (props) => {
	const { children } = props;
	const [pending, setPending] = useState(true);
	const [principal, setPrincipal] = useState('');
	const [vetaWallet, setVetaWallet] = useState();
	const [client, setClient] = useState();

	const initAuth = async () => {
		const client = await AuthClient.create();
		const isAuthenticated = await client.isAuthenticated();

		setClient(client);

		if (isAuthenticated) {
			const identity = client.getIdentity();
			const principal = identity.getPrincipal();
			setPrincipal(principal.toString());
			await handleVetaProfile(principal);
		}
		setPending(false);
	};

	const signInByICProvider = async (callback) => {
		const { identity, principal } = await new Promise((resolve, reject) => {
			client.login({
				identityProvider: 'https://identity.ic0.app',
				onSuccess: () => {
					const identity = client.getIdentity();
					const principal = identity.getPrincipal();
					resolve({ identity, principal });
				},
				onError: reject,
			});
		});
		setPrincipal(principal.toString());
		// await vetacenter.registerUser(principal);
		// Check if principal existed in VetaWallet
		await handleVetaProfile(principal);
		if (callback) {
			callback();
		}
	};

	const handleVetaProfile = async (principal) => {
		try {
			let vetaProfile = await vetawallet.get(principal);
			setVetaWallet(vetaProfile);
		} catch (e) {
			console.log(e);
		}
	};

	const signOut = async () => {
		await client.logout();
		setPrincipal('');
		setVetaWallet();
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
			}}>
			{!pending && children}
		</VetaIdentityContext.Provider>
	);
};

const useVetaIdentity = () => useContext(VetaIdentityContext);
export default useVetaIdentity;

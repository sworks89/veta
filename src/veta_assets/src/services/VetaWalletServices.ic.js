import { getVetaWalletActor, unwrapResult } from './actor';
import { v4 as uuidV4 } from 'uuid';

export const addProfile = async (principal, profile) => {
	const actor = getVetaWalletActor();
	if (!actor || !principal || !profile) throw new Error('Missing actor, principal, or profile');

	const { name = '', isDefault = false, data = [] } = profile;

	let userData = await actor.get(principal);
	let profiles = [...(userData.profiles || [])];
	profiles.push({
		id: uuidV4(),
		profileName: name,
		isDefault,
		data,
		userId: principal,
	});
	userData = { ...userData, profiles };
	const result = await actor.update(userData);
	unwrapResult(result);
	return userData;
};

export const shareProfile = async (profile) => {
	const actor = getVetaWalletActor();
	if (!actor || !profile) throw new Error('Missing actor or profile');

	const result = await actor.shareProfile(profile);
	unwrapResult(result);
	return true;
};

export const unshareProfile = async (profileId) => {
	const actor = getVetaWalletActor();
	if (!actor || !profileId) throw new Error('Missing actor or profileId');

	const result = await actor.unshareProfile(profileId);
	unwrapResult(result);
	return true;
};

export const getSharedProfile = async (profileId) => {
	const actor = getVetaWalletActor();
	if (!actor || !profileId) throw new Error('Missing actor or profileId');

	const profile = await actor.getSharedProfile(profileId);
	return profile;
};

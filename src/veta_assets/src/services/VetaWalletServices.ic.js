import { getVetaWalletActor, unwrapResult } from './actor';
import { v4 as uuidV4 } from 'uuid';

// ── Profiles ────────────────────────────────────────────────────────

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

export const deleteProfile = async (principal, profileId) => {
	const actor = getVetaWalletActor();
	if (!actor || !principal) throw new Error('Missing actor or principal');

	let userData = await actor.get(principal);
	const profiles = (userData.profiles || []).filter((p) => p.id !== profileId);
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

	return await actor.getSharedProfile(profileId);
};

// ── Data entries ────────────────────────────────────────────────────

export const deleteDataEntry = async (principal, dataId) => {
	const actor = getVetaWalletActor();
	if (!actor || !principal) throw new Error('Missing actor or principal');

	let userData = await actor.get(principal);
	const data = (userData.data || []).filter((d) => d.dataId !== dataId);
	// Also remove from any profiles that reference this entry
	const profiles = (userData.profiles || []).map((p) => ({
		...p,
		data: (p.data || []).filter((d) => d.dataId !== dataId),
	}));
	userData = { ...userData, data, profiles };
	const result = await actor.update(userData);
	unwrapResult(result);
	return userData;
};

export const updateDataEntry = async (principal, dataId, updates) => {
	const actor = getVetaWalletActor();
	if (!actor || !principal) throw new Error('Missing actor or principal');

	let userData = await actor.get(principal);
	const data = (userData.data || []).map((d) =>
		d.dataId === dataId ? { ...d, ...updates } : d,
	);
	userData = { ...userData, data };
	const result = await actor.update(userData);
	unwrapResult(result);
	return userData;
};

// ── Account ─────────────────────────────────────────────────────────

export const deleteAccount = async () => {
	const actor = getVetaWalletActor();
	if (!actor) throw new Error('Missing actor');

	const result = await actor.deleteAccount();
	unwrapResult(result);
	return true;
};

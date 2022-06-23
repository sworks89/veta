import { vetawallet } from '../../../declarations/vetawallet';
import { Principal } from '@dfinity/principal';
import { v4 as uuidV4 } from 'uuid';

export const addProfile = async (principal, profile) => {
	return new Promise(async (resolve, reject) => {
		if (!principal || !profile) reject();
		try {
			const { name = '', isDefault = false, data = [] } = profile;

			let userData = await vetawallet.get(principal);
			let profiles = userData.profiles;
			if (profiles && profiles.length >= 0) {
				profiles.push({
					id: uuidV4(),
					profileName: name,
					isDefault,
					data,
				});
			}
			userData.profiles = profiles;
			// const updatedUserData = { ...userData, id: principal, profiles };
			// console.log(updatedUserData);
			await vetawallet.update(userData);
			resolve(userData);
		} catch (e) {
			console.error(e);
			reject(e);
		}
	});
};

export const shareProfile = async (profile) => {
	return new Promise(async (resolve, reject) => {
		if (!profile) reject();
		try {
			 await vetawallet.shareProfile(profile);
			resolve(true);
		} catch (e) {
			console.error(e);
			reject(e);
		}
	});
};

export const getSharedProfile = async (profileId) => {
	return new Promise(async (resolve, reject) => {
		if (!profileId) reject();
		try {
			let profile = await vetawallet.getSharedProfile(profileId); 
			resolve(profile);
		} catch (e) {
			console.error(e);
			reject(e);
		}
	});
};

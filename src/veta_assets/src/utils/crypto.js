import CryptoJS from 'crypto-js';

export const signData = (data) => {
	return CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(data));
};

export const encryptData = (data) => {
	return CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
};

export const decryptData = (encryptedData) => {
	var bytes = CryptoJS.AES.decrypt(encryptedData, 'secret key 123');
	return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

import AES from 'crypto-js/aes';
import SHA256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-Utf8';

export const signData = (data) => {
	return Base64.stringify(SHA256(data));
};

export const encryptData = (data) => {
	return AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
};

export const decryptData = (encryptedData) => {
	var bytes  = AES.decrypt(encryptedData, 'secret key 123');
    return JSON.parse(bytes.toString(Utf8));
};
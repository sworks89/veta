import CryptoJS from 'crypto-js';

// Derive an encryption key from the user's principal.
// This ensures each user has a unique key — data encrypted by one user
// cannot be decrypted by another. For production, replace this with
// vetKD (threshold key derivation) from the Internet Computer.
let _derivedKey = null;

export function setEncryptionKey(principal) {
  if (principal) {
    _derivedKey = CryptoJS.SHA256(principal.toString()).toString();
  } else {
    _derivedKey = null;
  }
}

function getKey() {
  if (!_derivedKey) {
    throw new Error('Encryption key not set. Call setEncryptionKey(principal) after login.');
  }
  return _derivedKey;
}

export const signData = (data) => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(data));
};

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), getKey()).toString();
};

export const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, getKey());
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

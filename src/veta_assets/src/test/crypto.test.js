import { describe, it, expect, beforeEach } from "vitest";
import { signData, encryptData, decryptData, setEncryptionKey } from "../utils/crypto";

describe("crypto utils", () => {
  beforeEach(() => {
    // Simulate a principal-derived key
    setEncryptionKey({ toString: () => "test-principal-aaaaa-aa" });
  });

  describe("signData", () => {
    it("returns a Base64-encoded SHA256 hash", () => {
      const sig = signData("hello");
      expect(sig).toBeTruthy();
      expect(typeof sig).toBe("string");
      expect(sig.length).toBeGreaterThan(0);
    });

    it("produces consistent signatures for the same input", () => {
      const sig1 = signData("test data");
      const sig2 = signData("test data");
      expect(sig1).toBe(sig2);
    });

    it("produces different signatures for different inputs", () => {
      const sig1 = signData("data A");
      const sig2 = signData("data B");
      expect(sig1).not.toBe(sig2);
    });
  });

  describe("encryptData / decryptData", () => {
    it("encrypts and decrypts a string roundtrip", () => {
      const original = { name: "Alice", age: 30 };
      const encrypted = encryptData(original);
      expect(typeof encrypted).toBe("string");
      expect(encrypted).not.toContain("Alice");

      const decrypted = decryptData(encrypted);
      expect(decrypted).toEqual(original);
    });

    it("encrypts and decrypts complex objects", () => {
      const original = {
        entries: [
          { type: "email", value: "alice@example.com" },
          { type: "phone", value: "+1234567890" },
        ],
        nested: { deep: { value: true } },
      };
      const encrypted = encryptData(original);
      const decrypted = decryptData(encrypted);
      expect(decrypted).toEqual(original);
    });

    it("produces different ciphertext for different data", () => {
      const enc1 = encryptData({ a: 1 });
      const enc2 = encryptData({ b: 2 });
      expect(enc1).not.toBe(enc2);
    });

    it("throws when key is not set", () => {
      setEncryptionKey(null);
      expect(() => encryptData({ test: true })).toThrow("Encryption key not set");
    });

    it("uses different keys for different principals", () => {
      setEncryptionKey({ toString: () => "principal-A" });
      const encA = encryptData({ secret: "data" });

      setEncryptionKey({ toString: () => "principal-B" });
      const encB = encryptData({ secret: "data" });

      // Same data, different principals → different ciphertext
      expect(encA).not.toBe(encB);

      // Cannot decrypt with wrong key
      expect(() => decryptData(encA)).toThrow();
    });
  });
});

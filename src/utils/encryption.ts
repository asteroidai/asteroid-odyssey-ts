import * as forge from "node-forge";

// Utility function to encrypt a plaintext value using a PEM public key
export function encryptWithPublicKey(
  plaintext: string,
  pemPublicKey: string,
): string {
  try {
    // The public key is already in PEM format from the API
    // Parse the public key using node-forge
    const publicKey = forge.pki.publicKeyFromPem(pemPublicKey);

    // Encrypt the plaintext using RSA
    const encrypted = publicKey.encrypt(plaintext, "RSAES-PKCS1-V1_5");

    // Convert to base64 for transmission
    return forge.util.encode64(encrypted);
  } catch (error) {
    console.error("Encryption failed:", error);
    throw new Error(
      "Failed to encrypt: " +
        (error instanceof Error ? error.message : "unknown error"),
    );
  }
}

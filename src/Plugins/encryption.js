import CryptoJS from 'crypto-js/crypto-js';

export class Encryption {
  tunnel_encryption_secret = '';

  tunnel_encryption = true;

  constructor(tunnel_encryption, tunnel_encryption_secret) {
    // Constructor
    this.tunnel_encryption = tunnel_encryption;
    this.tunnel_encryption_secret = tunnel_encryption_secret;
  }

  encrypt(message, secret = '') {
    if (secret === '') {
      secret = this.tunnel_encryption_secret;
    }

    const ciphertext = CryptoJS.AES.encrypt(message, secret).toString();
    return ciphertext;
  }

  decrypt(message, secret = '') {
    if (secret === '') {
      secret = this.tunnel_encryption_secret;
    }

    const bytes = CryptoJS.AES.decrypt(message, secret);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }

  sha512(message) {
    return CryptoJS.SHA512(message).toString();
  }

  sha256(message) {
    return CryptoJS.SHA256(message);
  }
}

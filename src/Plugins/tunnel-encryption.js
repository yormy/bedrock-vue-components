import CryptoJS from 'crypto-js/crypto-js';
import { Encryption } from './encryption.js';

/**
 * Encryption class for encrypt/decrypt that works between programming languages.
 *
 * @author Vee Winch.
 * @link https://stackoverflow.com/questions/41222162/encrypt-in-php-openssl-and-decrypt-in-javascript-cryptojs Reference.
 * @link https://github.com/brix/crypto-js/releases crypto-js.js can be download from here.
 */
export default class TunnelEncryption {
  // /*eslint-disable */
  // tunnel_encryption_secret = ''
  // tunnel_encryption = true
  // /* eslint-enable */

  constructor(tunnel_encryption, tunnel_encryption_secret) {
    // Constructor
    this.tunnel_encryption = tunnel_encryption;
    this.tunnel_encryption_secret = btoa(`${tunnel_encryption_secret}utreuurty`);
  }

  /**
   * @var integer Return encrypt method or Cipher method number. (128, 192, 256)
   */
  get encryptMethodLength() {
    const { encryptMethod } = this;
    // get only number from string.
    // @link https://stackoverflow.com/a/10003709/128761 Reference.
    const aesNumber = encryptMethod.match(/\d+/)[0];
    return parseInt(aesNumber);
  } // encryptMethodLength

  /**
   * @var integer Return cipher method divide by 8. example: AES number 256 will be 256/8 = 32.
   */
  get encryptKeySize() {
    const aesNumber = this.encryptMethodLength;
    return parseInt(aesNumber / 8);
  } // encryptKeySize

  /**
   * @link http://php.net/manual/en/function.openssl-get-cipher-methods.php Refer to available methods in PHP if we are working between JS & PHP encryption.
   * @var string Cipher method.
   *              Recommended AES-128-CBC, AES-192-CBC, AES-256-CBC
   *              due to there is no `openssl_cipher_iv_length()` function in JavaScript
   *              and all of these methods are known as 16 in iv_length.
   */
  get encryptMethod() {
    return 'AES-256-CBC';
  } // encryptMethod

  /**
   * Decrypt string.
   *
   * @link https://stackoverflow.com/questions/41222162/encrypt-in-php-openssl-and-decrypt-in-javascript-cryptojs Reference.
   * @link https://stackoverflow.com/questions/25492179/decode-a-base64-string-using-cryptojs Crypto JS base64 encode/decode reference.
   * @param string encryptedString The encrypted string to be decrypt.
   * @param string key The key.
   * @return string Return decrypted string.
   */
  decrypt(encryptedString, key = null) {
    if (!this.tunnel_encryption) {
      return encryptedString;
    }

    if (!key) {
      key = this.tunnel_encryption_secret;
    }

    const json = JSON.parse(
      CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encryptedString)),
    );

    const salt = CryptoJS.enc.Hex.parse(json.salt);
    const iv = CryptoJS.enc.Hex.parse(json.iv);

    const encrypted = json.ciphertext; // no need to base64 decode.

    let iterations = parseInt(json.iterations);
    if (iterations <= 0) {
      iterations = 999;
    }
    const encryptMethodLength = this.encryptMethodLength / 4; // example: AES number is 256 / 4 = 64
    const hashKey = CryptoJS.PBKDF2(key, salt, {
      hasher: CryptoJS.algo.SHA512,
      keySize: encryptMethodLength / 8,
      iterations,
    });

    const decrypted = CryptoJS.AES.decrypt(encrypted, hashKey, {
      mode: CryptoJS.mode.CBC,
      iv,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  } // decrypt

  /**
   * Encrypt string.
   *
   * @link https://stackoverflow.com/questions/41222162/encrypt-in-php-openssl-and-decrypt-in-javascript-cryptojs Reference.
   * @link https://stackoverflow.com/questions/25492179/decode-a-base64-string-using-cryptojs Crypto JS base64 encode/decode reference.
   * @param string string The original string to be encrypt.
   * @param string key The key.
   * @return string Return encrypted string.
   */
  encrypt(string, key = null) {
    if (!this.tunnel_encryption) {
      return string;
    }

    if (!key) {
      key = this.tunnel_encryption_secret;
    }

    // the reason to be 16, please read on `encryptMethod` property.
    const iv = CryptoJS.lib.WordArray.random(16);

    const salt = CryptoJS.lib.WordArray.random(256);
    const iterations = 999;
    const encryptMethodLength = this.encryptMethodLength / 4; // example: AES number is 256 / 4 = 64
    const hashKey = CryptoJS.PBKDF2(key, salt, {
      hasher: CryptoJS.algo.SHA512,
      keySize: encryptMethodLength / 8,
      iterations,
    });

    const encrypted = CryptoJS.AES.encrypt(string, hashKey, {
      mode: CryptoJS.mode.CBC,
      iv,
    });
    const encryptedString = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

    const output = {
      ciphertext: encryptedString,
      iv: CryptoJS.enc.Hex.stringify(iv),
      salt: CryptoJS.enc.Hex.stringify(salt),
      iterations,
    };

    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(output)));
  }

  encryptWithClientSignature(string, key = null) {
    if (!key) {
      key = this.tunnel_encryption_secret;
    }
    const secret = key + this.clientSignature();
    return this.encrypt(string, secret);
  }

  clientSignature() {
    let signature = '';
    signature += this.signatureBrowserVersion();
    return signature;
  }

  signaturePlatform() {
    return navigator.platform;
  }

  signaturePlugins() {
    let signaturePlugins = '';
    for (let i = 0; i < navigator.plugins.length; i+=1) {
      signaturePlugins += `${navigator.plugins[i].name};`;
    }
    return signaturePlugins;
  }

  signatureBrowserVersion() {
    const Sys = {};
    const ua = navigator.userAgent.toLowerCase();

    /*eslint-disable */
    let s
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
      (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
        (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
          (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
            (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0
    /* eslint-enable */

    let version = '';

    if (Sys.ie) version = `IE ${Sys.ie}`;
    if (Sys.firefox) version = `Firefox ${Sys.firefox}`;
    if (Sys.chrome) version = `Chrome ${Sys.chrome}`;
    if (Sys.opera) version = `Opera ${Sys.opera}`;
    if (Sys.safari) version = `Safari ${Sys.safari}`;

    return version;
  }

  buildPostValue(plainText) {
    if (this.tunnel_encryption) {
      return this.encryptWithClientSignature(plainText.toString());
    }
    return plainText;
  }

  buildPostValueHashed(plaintext) {
    const encrypt = new Encryption(this.tunnel_encryption, this.tunnel_encryption_secret);
    return this.buildPostValue(encrypt.sha512(plaintext));
  }
}

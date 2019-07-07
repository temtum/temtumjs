const request = require('request-promise-native');
const crypto = require('crypto');
const secp256k1 = require('secp256k1');

class Wallet {
  static generateKeyPair() {
    const privateKey = crypto.randomBytes(32);
    const address = secp256k1.publicKeyCreate(privateKey);

    return {
      privateKey: privateKey.toString('hex'),
      address: address.toString('hex')
    };
  }

  constructor(url) {
    this.url = url;
  }

  sendTransaction(txHex) {
    return request({
      method: 'POST',
      uri: `${this.url}/transaction/send`,
      json: {txHex}
    });
  }

  getUnspent(address) {
    return request({
      method: 'GET',
      uri: `${this.url}/address/${address}/unspent`,
      json: true
    });
  }
}

module.exports = Wallet;
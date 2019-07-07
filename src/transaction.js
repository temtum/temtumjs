const crypto = require('crypto');
const secp256k1 = require('secp256k1');

class Transaction {
  static getTimestamp() {
    return Math.round(new Date().getTime() / 1000);
  }

  static sha256Hex(data) {
    return crypto
      .createHash('sha256')
      .update(data)
      .digest('hex');
  }

  static signInput(params, privateKey) {
    const key = Transaction.sha256Hex(params.join(''));
    const message = secp256k1.sign(
      Buffer.from(key, 'hex'),
      Buffer.from(privateKey, 'hex')
    );
    const signature = message.signature;

    return signature.toString('hex');
  }

  static signInputs(id, inputs, privateKey) {
    try {
      for (let i = 0, length = inputs.length; i < length; i++) {
        const input = inputs[i];
        const params = [
          id,
          input.txOutIndex,
          input.txOutId,
          input.amount,
          input.address
        ];

        input.signature = Transaction.signInput(params, privateKey);
      }

      return inputs;
    } catch (error) {
      throw new Error(`Error signing inputs ${inputs}: ${error}`);
    }
  }

  constructor() {
    this.type = 'regular';
    this.txIns = [];
    this.txOuts = [];
  }

  create(utxo, recipientAddress, amount, privateKey) {
    if (!utxo.length) {
      throw new Error('Wrong UTXO');
    }

    if (!privateKey || privateKey.length !== 64) {
      throw new Error('Wrong privateKey');
    }

    const senderAddress = utxo[0].address;
    const generatedAddress = secp256k1.publicKeyCreate(Buffer.from(privateKey, 'hex'));

    if (generatedAddress.toString('hex') !== senderAddress) {
      throw new Error('Wrong pairs address/privateKey');
    }

    const totalAmount = utxo.reduce((a, b) => a + b['amount'], 0);
    const restAmount = totalAmount - amount;

    if (restAmount < 0) {
      throw new Error(
        'The sender does not have enough to pay for the transaction.'
      );
    }

    this.timestamp = Transaction.getTimestamp();
    this.txIns = utxo;
    this.txOuts = [
      {
        address: recipientAddress,
        amount
      },
      {
        address: senderAddress,
        amount: restAmount
      }
    ];

    this.sign(utxo, privateKey);

    const tx = {
      type: this.type,
      txIns: this.txIns,
      txOuts: this.txOuts,
      timestamp: this.timestamp,
      id: this.id,
    };

    return Buffer.from(JSON.stringify(tx)).toString('hex');
  }

  sign(utxo, privateKey) {
    const params = [
      this.type,
      this.timestamp,
      JSON.stringify(this.txIns),
      JSON.stringify(this.txOuts)
    ];

    this.id = Transaction.sha256Hex(params.join(''));
    this.txIns = Transaction.signInputs(this.id, utxo, privateKey);
  }
}

module.exports = Transaction;
# Temtum JavaScript Library

[![Covered with][jest-icon]][jest-link]

A JavaScript Temtum library.

## About

Temtum is a new, lightweight, peer-to-peer cryptocurrency where anyone can support the Temporal blockchain network, creating a new world of financial freedom away from centralised institutions.

This library will help you to make various operations in Temtum network using simple interface.

## How to use

If you want to use this library on Node.js:

```
const temtumjs = require('temtumjs');
```

## Usage example

```javascript
const Transaction = require('temtumjs').Transaction;
const Wallet = require('temtumjs').Wallet;

// Your Temtum wallet keys. If you don't have a key pair, you can generate one using Wallet.generateKeyPair method
const PUBLIC_KEY = 'your_temtum_public_key';
const PRIVATE_KEY = 'your_temtum_private_key';
const API_URL = 'your_temtum_api_url';

// Create Transaction instance
const transaction = new Transaction();
const wallet = new Wallet(API_URL);

// Get unspent outputs of your wallet. If you already have any, you can add it using Transaction.addInput method
wallet.getUnspent(PUBLIC_KEY).then((response) => {
  // Use unspent outputs as inputs for the new transaction
  const txHex = transaction.create(response.unspentTxOuts, '<recipient_address>', <amount>, PRIVATE_KEY);
  
  // Send the transaction to Temtum node
  wallet.sendTransaction(txHex).then(() => {
    console.log('You have successfully sent a transaction!');
  });
});
```

## API doc

### Transaction

#### Properties

|Name|Type|
|----|----|
|type|String|
|txIns|Array[TxIn]|
|txOuts|Array[TxOut]|
|timestamp|Number|
|id|String|

#### Methods

**_create(utxo: Array[TxIn], recipientAddress: String, amount: Number, privateKey: String)_**

Return transaction as a hex string.

*(static)* **_signInput(params: Array, privateKey: String) -> String_**

Generate transaction id based on transaction properties and add signatures to transaction inputs.

TxIn properties:

|Name|Type|
|----|----|
|address|String|
|amount|Number|
|txOutId|String|
|txOutIndex|Number|
|blockIndex|Number|

TxOut properties:

|Name|Type|
|----|----|
|address|String|
|amount|Number|

### Wallet

#### Methods

**_getUnspent(address: String) -> Promise({ unspentTxOuts: Array[TxIn] })_**

Get unspent outputs for a specific address.

**_sendTransaction(txHex: String) -> Promise({ transaction: Object })_**

Send new transaction to Temtum node using specific properties.

*(static)* **_generateKeyPair() -> ({ privateKey: String, address: String })_**

Generate new public and private keys pair.

[jest-icon]: https://img.shields.io/badge/Covered%20with-Jest-brightgreen.svg

[jest-link]: https://jestjs.io/

[npm-link]: https://www.npmjs.com/package/temtumjs


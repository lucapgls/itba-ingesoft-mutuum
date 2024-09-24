require('dotenv').config();
const { generateCiphertext } = require('./genCiphertext');
const { v4: uuidv4 } = require('uuid');

async function createWallet() {
  const fetch = (await import('node-fetch')).default;

  const url = 'https://api.circle.com/v1/w3s/developer/wallets';
  const ciphertext = generateCiphertext(); 
  const idempotencyKey = uuidv4();

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`
    },
    body: JSON.stringify({
      idempotencyKey: idempotencyKey,
      entitySecretCipherText: ciphertext,
      blockchains: ['ETH-SEPOLIA'],
      count: 1,
      walletSetId: process.env.WALLET_SET_ID,
    })
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = { createWallet };
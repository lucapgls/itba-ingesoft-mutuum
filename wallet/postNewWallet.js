require('dotenv').config();
const { generateCiphertext } = require('./genCiphertext');
const { v4: uuidv4 } = require('uuid');

async function postCreateWallet() {
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

    console.log('Full JSON response:', JSON.stringify(json, null, 5));
    // Check if the response contains wallets
    if (json.data.wallets) {
      return json.data.wallets.map(wallet => wallet.id);
    } else {
      throw new Error('No wallets found in the response');
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = { postCreateWallet };

import 'react-native-get-random-values';
import Config from 'react-native-config';
import { generateCiphertext } from './genCiphertext';
import { v4 as uuidv4 } from 'uuid';
import { CIRCLE_API_KEY, WALLET_SET_ID } from '@env';

async function postCreateWallet() {
  const url = 'https://api.circle.com/v1/w3s/developer/wallets';
  const ciphertext = generateCiphertext(); 
  const idempotencyKey = uuidv4();

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CIRCLE_API_KEY}`
    },
    body: JSON.stringify({
      idempotencyKey: idempotencyKey,
      entitySecretCipherText: ciphertext,
      blockchains: ['ETH-SEPOLIA'],
      count: 1,
      walletSetId: WALLET_SET_ID,
    })
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    // Check if the response contains wallets
    if (json.data.wallets) {
      return await json.data.wallets.map(wallet => wallet.id);
    } else {
      throw new Error('(postNewWallet) No wallets found in the response');
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

export { postCreateWallet };
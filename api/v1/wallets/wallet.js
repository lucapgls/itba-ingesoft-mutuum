import { generateCiphertext } from './ciphertext.js';
import { v4 as uuidv4 } from 'uuid';

async function createWallet() {
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
            count: 1, // TODO: Pass as a parameter
            walletSetId: process.env.WALLET_SET_ID,
        })
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        
        // Check if the response contains wallets
        if (json.data && json.data.wallets) {
            return json.data.wallets.map(wallet => wallet.id);
        } else {
            throw new Error('(postCreateWallet) No wallets found in the response');
        }

    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error for handling in the endpoint
    }
}

export { createWallet };

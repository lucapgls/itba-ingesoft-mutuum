import express from 'express';
import { generateCiphertext } from './ciphertext.js';
import { createWallet } from './wallet.js';
import { getWalletBalanceValue } from './balance.js';
import { convertTokenToARS } from './convert.js';

const router = express.Router();

/*
 * @GET /api/wallet/ciphertext
 *
 * brief: Generate a ciphertext
 * 
 * Example request:
 * /api/wallet/ciphertext
 */
router.get('/ciphertext', (req, res) => {
  try {
    const ciphertext = generateCiphertext();
    res.status(200).json({ ciphertext });
  } catch (error) {
    res.status(500).json({ error: 'Error generating ciphertext' });
  }
});

/*
 * @POST /api/wallet/create
 *
 * brief: Create a wallet (currently only supports creating one wallet)
 * 
 * Example request:
 * /api/wallet/create
 */
router.post('/create', async (req, res) => {
    try {
        const walletIds = await createWallet();
        res.status(200).json({ walletIds });
    } catch (error) {
        res.status(500).json({ error: 'Error creating wallet', details: error.message });
    }
});

/*
 * @GET /api/wallet/balance
 *
 * brief: Get the balance of a wallet
 * 
 * Query parameters:
 * - walletID: The ID of the wallet
 * 
 * Example request:
 * /api/wallet/balance?walletID=1234
 */
router.get('/balance', async (req, res) => {
    const { walletID } = req.query; // Get walletID from query parameters

    if (!walletID) {
        return res.status(400).json({ error: 'walletID is required' });
    }

    try {
        const balances = await getWalletBalanceValue(walletID);
        res.status(200).json({ balances });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching wallet balance', details: error.message });
    }
});

/*
    * @GET /api/wallet/convert
    *
    * brief: Convert a token to ARS
    * 
    * Query parameters:
    * - amount: The amount of the token to convert
    * - token: The token to convert
    * 
    * Example request:
    * /api/wallet/convert?amount=100&token=usd
    */
router.get('/convert' , async (req, res) => {
    const { amount, token } = req.query;

    if (!amount || !token) {
        return res.status(400).json({ error: 'amount and token are required' });
    }

    try {
        const convertedAmount = await convertTokenToARS(amount, token);
        res.status(200).json({ convertedAmount });
    } catch (error) {
        res.status(500).json({ error: 'Error converting token to ARS', details: error.message });
    }
});


export default router;

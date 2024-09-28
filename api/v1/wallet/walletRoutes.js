import express from 'express';
import { generateCiphertext } from './ciphertext.js';
import { createWallet } from './wallet.js';
import { getWalletBalanceValue } from './balance.js';

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


export default router;

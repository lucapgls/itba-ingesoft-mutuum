import express, { json } from 'express';
import { config } from 'dotenv';

// Wallet imports
import { generateCiphertext } from './wallet/ciphertext.js';
import { createWallet } from './wallet/wallet.js';
import { getWalletBalanceValue } from './wallet/balance.js';

// DB imports


// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());

/*
 * @GET /api/health
 *
 * brief: Check if the API is running
 * 
 * Example request:
 * /api/health
 */
app.get('/api/health', (req, res) => {
    res.status(200).send('API is running');
});

/*
 * @GET /api/wallet/ciphertext
 *
 * brief: Generate a ciphertext
 * 
 * Example request:
 * /api/wallet/ciphertext
 */
app.get('/api/wallet/ciphertext', (req, res) => {
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
app.post('/api/wallet/create', async (req, res) => {
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
app.get('/api/wallet/balance', async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

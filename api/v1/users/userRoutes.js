import express from 'express';

import { createUser } from './create_user.js';
import { getWalletId } from './user.js';
import loginUser from './login.js';
const router = express.Router();

/*
 * @POST /api/user/create
 *
 * brief: Create a user (and a wallet for the user)
 * 
 * Request body:
 * - email: The email of the user
 * - password: The password of the user
 * 
 * Example request:
 * /api/user/create
 * {
 *     "email": "email",
 *    "password": "password"
 * }
 */
router.post('/create', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    try {

        const { user, wallet_id } = await createUser(email, password);
        res.status(201).json({ user, wallet_id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/*
 * @POST /api/user/login
 *
 * brief: Login a user
 * 
 * Request body:
 * - email: The email of the user
 * - password: The password of the user
 * 
 * Example request:
 * /api/user/login
 * {
 *    "email": "email",
 *    "password": "password"
 * }
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    try {

        const { user, session } = await loginUser(email, password);
        res.status(201).json({ user, session });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/*
 * @GET /api/users/walletID
 * 
 * brief: Get the wallet ID for a user
 * 
 * Query parameters:
 * - userID: The ID of the user
 * 
 * Example request:
 * /api/users/walletID?userID=1234
 */
router.get('/walletID', async (req, res) => {
    const { userID } = req.query; // Get userID from query parameters

    if (!userID) {
        return res.status(400).json({ error: 'userID is required' });
    }

    try {
        const walletID = await getWalletId(userID);
        res.status(200).json({ walletID });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching wallet ID', details: error.message });
    }
});

export default router;
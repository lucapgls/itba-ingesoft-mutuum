import express from 'express';

import { createUser } from './create_user.js';
import { getWalletId } from './user.js';
import loginUser from './login.js';
import { getUserInfo } from './user_info.js';
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
    const { email, password, display_name } = req.body;
    if (!email || !password || !display_name) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    try {

        const { user, wallet_id } = await createUser(email, password, display_name);
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
    * @GET /api/users/info
    *
    * brief: Fetch user info
    * 
    * Example request:
    * /api/users/info?userId=123
    */
router.get('/info', async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'userId query parameter is required' });
    }   

    try {
        const user = await getUserInfo(userId);
        
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user info', details: error.message });
    }
});


export default router;
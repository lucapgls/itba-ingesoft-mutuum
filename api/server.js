import express, { json } from 'express';
import { config } from 'dotenv';
import walletRouter from './wallet/walletRoutes.js';
import userRouter from './user/userRoutes.js';

// Load environment variables
config();

const app = express();
const PORT = process.env.BACKEND_API_PORT || 3000;

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

app.use('/api/wallet', walletRouter);
app.use('/api/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

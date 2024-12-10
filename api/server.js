import express, { json } from 'express';
import { config } from 'dotenv';

import walletRouter from './v1/wallets/walletRoutes.js';
import userRouter from './v1/users/userRoutes.js';
import lendingPostRouter from './v1/lendingPost/lendingPostRoutes.js';
import loanRouter from './v1/loan/loanRoutes.js';
import contractRoutes from './contractRoutes.js';


// Load environment variables
config();

const app = express();
const PORT = process.env.BACKEND_API_PORT || 3000;


app.use(json());

/*
 * @GET /api/health
 * brief: Check if the API is running
 */
app.get('/api/health', (req, res) => {
    res.status(200).send('API is running');
});


app.use('/api/v1/wallets', walletRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/lendingPost', lendingPostRouter); 
app.use('/api/v1/loan', loanRouter);
app.use('/api/contracts', contractRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
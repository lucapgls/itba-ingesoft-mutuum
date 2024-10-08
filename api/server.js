import express, { json } from 'express';
import { config } from 'dotenv';

import walletRouter from './v1/wallets/walletRoutes.js';
import userRouter from './v1/users/userRoutes.js';
import loanRouter from './v1/loans/loanRoutes.js';

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
app.use('/api/v1/loans', loanRouter); 


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;

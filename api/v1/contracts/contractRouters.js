import express from 'express';
import { createLoanContract, takeLoanContract } from './contractQueries.js';

const router = express.Router();

/*
 * @POST /api/contracts/create
 *
 * brief: Crear un nuevo contrato para un préstamo
 */
router.post('/create', async (req, res) => {
    const { lenderWalletId, loanAmount, interest, deadline } = req.body;

    if (!lenderWalletId || !loanAmount || !interest || !deadline) {
        return res.status(400).json({ error: 'lenderWalletId, loanAmount, interest, and deadline are required' });
    }

    try {
        const contractAddress = await createLoanContract(lenderWalletId, loanAmount, interest, deadline);
        res.status(200).json({ contractAddress });
    } catch (error) {
        res.status(500).json({ error: 'Error creating loan contract', details: error.message });
    }
});

/*
 * @POST /api/contracts/take
 *
 * brief: Tomar un préstamo desde un contrato
 */
router.post('/take', async (req, res) => {
    const { contractAddress, borrowerWalletId } = req.body;

    if (!contractAddress || !borrowerWalletId) {
        return res.status(400).json({ error: 'contractAddress and borrowerWalletId are required' });
    }

    try {
        await takeLoanContract(contractAddress, borrowerWalletId);
        res.status(200).json({ message: 'Loan taken successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error taking loan', details: error.message });
    }
});

export default router;

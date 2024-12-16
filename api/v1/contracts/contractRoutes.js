import express from 'express';
import { createLoanContract, takeLoanContract, initializeLoanContract, deployContract } from './contractQueries.js';

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
        console.error('Error en /api/contracts/create:', error.message, error.stack); 
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

/*
 * @POST /api/contracts/initialize
 *
 * brief: Inicializar un contrato existente para un préstamo
 */
router.post('/initialize', async (req, res) => {
    const { lenderWalletId, contractAddress, loanAmount } = req.body;

    if (!lenderWalletId || !contractAddress || !loanAmount) {
        return res.status(400).json({ error: 'lenderWalletId, contractAddress, and loanAmount are required' });
    }

    try {
        await initializeLoanContract(lenderWalletId, contractAddress, loanAmount);
        res.status(200).json({ message: 'Contract initialized successfully' });
    } catch (error) {
        console.error('Error en /api/contracts/initialize:', error.message, error.stack);
        res.status(500).json({ error: 'Error initializing contract', details: error.message });
    }
});

/*
 * @GET /api/contracts/balance
 *
 * brief: Consultar el balance de un contrato
 */
router.get('/balance', async (req, res) => {
    const { contractAddress } = req.query;

    if (!contractAddress) {
        return res.status(400).json({ error: 'contractAddress is required' });
    }

    try {
        const balance = await getContractBalance(contractAddress);
        res.status(200).json({ balance });
    } catch (error) {
        console.error('Error en /api/contracts/balance:', error.message, error.stack);
        res.status(500).json({ error: 'Error fetching contract balance', details: error.message });
    }
});

/*
 * @POST /api/contracts/deploy
 *
 * brief: Crear un nuevo contrato para un préstamo
 */
router.post('/deploy', async (req, res) => {
    const { loanAmount, interest, deadline } = req.body;

    if (!loanAmount || !interest || !deadline) {
        return res.status(400).json({ error: 'loanAmount, interest and deadline are required' });
    }

    try {
        const contractAddress = await deployContract(loanAmount, interest, deadline);
        res.status(200).json({ contractAddress });
    } catch (error) {
        console.error('Error en /api/contracts/create:', error.message, error.stack); 
        res.status(500).json({ error: 'Error creating loan contract', details: error.message });
    }
});


export default router;

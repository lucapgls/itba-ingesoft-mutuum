    import express from 'express';
    import { fetchLoans, fetchLoansById, createLendingPost, createLoanRequirements,fetchLoanRequirements } from './loans.js';

    const router = express.Router();

/*
* @GET /api/loans
*
* brief: Fetch all loans or loans by user ID
* 
* Example request:
* /api/loans
* /api/loans?userId=123
*/
router.get('/', async (req, res) => {
    const { userId } = req.query;

    try {
        let loans;
        if (userId) {
            loans = await fetchLoansById(userId);
        } else {
            loans = await fetchLoans();
        }
    
        res.status(200).json({ loans });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching loans', details: error.message });
    }
});

    /*
     * @GET /api/loan/requirements
     * 
     * brief: Fetch loan requirements by lending post ID
     * 
     * Example request:
     * /api/loan/requirements?lendingPostId=123
     */
    router.get('/requirements', async (req, res) => {
        const { lendingPostId } = req.query;

        if (!lendingPostId) {
            return res.status(400).json({ error: 'lendingPostId query parameter is required' });
        }

        try {
            const requirements = await fetchLoanRequirements(lendingPostId);
            res.status(200).json({ requirements });
        } catch (error) {
            res.status(500).json({ error: 'Error fetching loan requirements', details: error.message });
        }
    });

    /*
    * @POST /api/loan
    * brief: Create a new lending post and its requirementsa
    * 
    * Example request:
    * /api/loan/create
    * 
    * Example body:
    * {
    *       "lenderId": "123",
    *       "initialAmount": 1000,
    *       "availableAmount": 1000,
    *       "interest": 0.1,
    *       "deadline": "2022-12-31",
    *       "requirements": [
    *           {
    *               "name": "credit_score",
    *               "type": "number",
    *               "min": 300,
    *               "max": 850
    *           }
    *       ]
    * }
    * 
    */
    router.post('/create', async (req, res) => {
        const { lenderId, initialAmount, availableAmount, interest, deadline, requirements } = req.body;

        try {
            const lendingPostId = await createLendingPost(lenderId, initialAmount, availableAmount, interest, deadline);

            if (lendingPostId) {
                const createdRequirements = await createLoanRequirements(lendingPostId, requirements);
                res.status(201).json({ lendingPostId, createdRequirements });
            } else {
                res.status(400).json({ error: 'Failed to create lending post' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error creating lending post', details: error.message });
        }
    });

    
    /*
    * @POST /api/loan/create
    * brief: Create a loan based on lending post and borrower request
    * 
    * Example request:
    * /api/loan/create
    */
    // router.post('/create', async (req, res) => {
    //     const { lendingPostId, borrowerId, loanAmount } = req.body;

    //     try {
    //         // Fetch the lending post to check the available amount
    //         const lendingPost = await getLendingPostById(lendingPostId);

    //         if (!lendingPost) {
    //             return res.status(404).json({ error: 'Lending post not found' });
    //         }

    //         const availableAmount = lendingPost.available_amount;

    //         // Check if the loan amount can be borrowed
    //         if (loanAmount > availableAmount) {
    //             return res.status(400).json({ error: 'Loan amount exceeds available budget' });
    //         }

    //         // Create the loan
    //         const newLoan = await createLoan(lendingPostId, borrowerId, loanAmount);

    //         if (!newLoan) {
    //             return res.status(500).json({ error: 'Failed to create loan' });
    //         }

    //         res.status(201).json({ loan: newLoan, message: 'Loan created successfully' });
    //     } catch (error) {
    //         res.status(500).json({ error: 'Error creating loan', details: error.message });
    //     }
    // });
    

    export default router;

    import express from 'express';
    import { fetchLoans, fetchLoansById, createLendingPost, createLoanRequirements,fetchLoanRequirements } from './loan.js';

    const router = express.Router();

    /*
    * @GET /api/loan
    *
    * brief: Fetch all loans
    * 
    * Example request:
    * /api/loan
    */
    router.get('/', async (req, res) => {
        try {
            const loans = await fetchLoans();
            res.status(200).json({ loans });
        } catch (error) {
            res.status(500).json({ error: 'Error fetching loans', details: error.message });
        }
    });


/*
 * @GET /api/loan/requirements/:lendingPostId
 * 
 * brief: Fetch loan requirements by lending post ID
 * 
 * Example request:
 * /api/loan/requirements/:lendingPostId
 */
router.get('/requirements/:lendingPostId', async (req, res) => {
    const { lendingPostId } = req.params;

    try {
        const requirements = await fetchLoanRequirements(lendingPostId);
        res.status(200).json({ requirements });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching loan requirements', details: error.message });
    }
});




    /*
    * @GET /api/loan/:userId
    *
    * brief: Fetch loans by user ID
    * 
    * Example request:
    * /api/loan/:userId
    */
    router.get('/:userId', async (req, res) => {
        const { userId } = req.params;

        try {
            const loans = await fetchLoansById(userId);
            res.status(200).json({ loans });
        } catch (error) {
            res.status(500).json({ error: 'Error fetching loans by user ID', details: error.message });
        }
    });

    /*
    * @POST /api/loan
    * brief: Create a new lending post and its requirementsa
    * 
    * Example request:
    * /api/loan/create
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


    

    export default router;

import express from 'express';
    import { fetchLendingPost, fetchLendingPostByLenderId, createLendingPost, createLendingPostRequirements,
        fetchLendingPostRequirements, fetchLendingPostById, fetchActiveLendingPosts } from './lendingPost.js';
    import { askForLoan, getAskForLoanIds } from './askForLoan.js';

    const router = express.Router();

/*
* @GET /api/lendingPost
*
* brief: Fetch all loans or loans by user ID or lender ID
* 
* Example request:
* /api/lendingPost
* /api/lendingPost?userId=123
* /api/LendingPost?Id=123
* /api/lendingPost?active=true
*/
router.get('/', async (req, res) => {
    const { userId, Id, active } = req.query;
    let loans;
    try {
        if (userId) {
            console.log('byUserId');
            loans = await fetchLendingPostByLenderId(userId);
        } else if (Id) {
            console.log('byLendingPostId');
            loans = await fetchLendingPostById(Id);
        } else if (active) {
            console.log('active');
            loans = await fetchActiveLendingPosts();
        } else {
            console.log('all');
            loans = await fetchLendingPost();
        }

        res.status(200).json({ loans });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching loans', details: error.message });
    }
});

    /*
    * @GET /api/lendingPost/ask?userId=123&lendingPostId=123
    *
    * brief: Ask for a loan
    * 
    * Example request:
    * /api/lendingPost/ask?userId=123&lendingPostId=123
    */
    router.put('/ask', async (req, res) => {
        const { userId, lending_post_id } = req.query;

        if (!userId || !lending_post_id) {
            return res.status(400).json({ error: 'userId and lendingPostId query parameters are required' });
        }

        try {
            const data = await askForLoan(userId, lending_post_id);
            res.status(200).json({ data });
        } catch (error) {
            res.status(500).json({ error: 'Error asking for loan', details: error.message });
        }
    });


    /*
    * @GET /api/lendingPost/asking
    *
    * brief: Fetch user ids requesting the loan by lending post ID
    * 
    * Example request:
    * /api/lendingPost/asking?lendingPostId=123
    * 
    */
    router.get('/asking', async (req, res) => {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: 'lendingPostId query parameter is required' });
        }

        try {
            const askingForLoanIds = await getAskForLoanIds(id);
            res.status(200).json(askingForLoanIds);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching asking for loan ids', details: error.message });
        }
    });


    /*
     * @GET /api/lendingPost/requirements
     * 
     * brief: Fetch loan requirements by lending post ID
     * 
     * Example request:
     * /api/lendingPost/requirements?lendingPostId=123
     */
    router.get('/requirements', async (req, res) => {
        const { lendingPostId } = req.query;

        if (!lendingPostId) {
            return res.status(400).json({ error: 'lendingPostId query parameter is required' });
        }

        try {
            const requirements = await fetchLendingPostRequirements(lendingPostId);
            res.status(200).json({ requirements });
        } catch (error) {
            res.status(500).json({ error: 'Error fetching loan requirements', details: error.message });
        }
    });

    /*
    * @POST /api/lendingPost
    * brief: Create a new lending post and its requirementsa
    * 
    * Example request:
    * /api/lendingPost/create
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
        const { lenderId, initialAmount, availableAmount, interest, deadline, requirements, quotas } = req.body;

        try {
            const lendingPostId = await createLendingPost(lenderId, initialAmount, availableAmount, interest, deadline, quotas);

            if (lendingPostId) {
                console.log(requirements)
                const createdRequirements = await createLendingPostRequirements(lendingPostId, requirements);
                res.status(201).json({ lendingPostId, createdRequirements });
            } else {
                res.status(400).json({ error: 'Failed to create lending post' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error creating lending post', details: error.message });
        }
    });

 
    export default router;
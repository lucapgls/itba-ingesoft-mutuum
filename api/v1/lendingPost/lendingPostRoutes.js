    import express from 'express';
    import { fetchLendingPost, fetchLendingPostById, createLendingPost, createLendingPostRequirements,fetchLendingPostRequirements } from './lendingPost.js';

    const router = express.Router();

/*
* @GET /api/lendingPost
*
* brief: Fetch all loans or loans by user ID
* 
* Example request:
* /api/lendingPost
* /api/lendingPost?userId=123
*/
router.get('/', async (req, res) => {
    const { userId } = req.query;

    try {
        let loans;
        if (userId) {
            loans = await fetchLendingPostById(userId);
        } else {
            loans = await fetchLendingPost();
        }
    
        res.status(200).json({ loans });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching loans', details: error.message });
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

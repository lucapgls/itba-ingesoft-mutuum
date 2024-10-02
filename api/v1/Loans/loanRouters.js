import express from 'express';
import { createLendingPostHandler } from './create_lending_post.js';

const router = express.Router();

/*
 * @POST /api/loan/createLendingPost
 * brief: Create a lending post
 * 
 * Request body:
 * - lenderId: ID of the lender (from auth.users.id)
 * - initialAmount: Total amount for the lending post
 * - interest: Interest rate for the loan
 * - deadline: Deadline for loan repayment (formatted as string)
 */
router.post('/createLendingPost', createLendingPostHandler);

export default router;

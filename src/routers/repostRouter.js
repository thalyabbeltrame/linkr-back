import { Router } from 'express';
import { createRepost } from '../controllers/repostController.js';


import { validateToken } from '../middlewares/tokenMiddleware.js';

const repostRouter = Router();

repostRouter.post('/repost/:postId', validateToken, createRepost);



export default repostRouter;

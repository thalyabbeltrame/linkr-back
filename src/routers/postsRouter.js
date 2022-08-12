import { Router } from 'express';

import validateToken from '../middlewares/tokenMiddleware.js';
import { likeDislikePost } from '../controllers/postsController.js';

const postsRouter = Router();

postsRouter.post('/posts/:id/likeDislike', validateToken, likeDislikePost);

export default postsRouter;

import { Router } from 'express';

import { likeDislikePost } from '../controllers/postsController.js';
import validateToken from '../middlewares/tokenMiddleware.js';

const postsRouter = Router();

postsRouter.post('/posts/:id/likeDislike', validateToken, likeDislikePost);

export default postsRouter;

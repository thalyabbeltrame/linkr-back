import { Router } from 'express';

import { likeDislikePost, updatePostDescription } from '../controllers/postsController.js';
import validateToken from '../middlewares/tokenMiddleware.js';

const postsRouter = Router();

postsRouter.post('/posts/:id/likeDislike', validateToken, likeDislikePost);

postsRouter.put('/post/update/:postId', validateToken , updatePostDescription);

export default postsRouter;

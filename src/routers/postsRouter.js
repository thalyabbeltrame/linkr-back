import { Router } from 'express';

import {
  catchPosts,
  deletePosts,
  getPostsByHashtag,
  likeDislikePost,
  publishPosts,
  getPostsByUserId,
} from '../controllers/postsController.js';

import { sanitizeDatas } from '../middlewares/dataSanitizationMiddleware.js';
import { validateSchema } from '../middlewares/schemaValidate.js';
import { validateToken } from '../middlewares/tokenMiddleware.js';
import { postSchema } from '../schemas/postSchemas.js';

const postsRouter = Router();

postsRouter.get('/timeline', validateToken, catchPosts);
postsRouter.post(
  '/timeline',
  validateToken,
  validateSchema(postSchema),
  sanitizeDatas,
  publishPosts
);
postsRouter.delete('/delete/:id', validateToken, deletePosts);
postsRouter.post('/posts/:id/likeDislike', validateToken, likeDislikePost);
postsRouter.get('/hashtag/:hashtag', validateToken, getPostsByHashtag);
postsRouter.get('/user-posts/:id', getPostsByUserId);

export default postsRouter;

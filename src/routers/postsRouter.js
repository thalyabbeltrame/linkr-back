import { Router } from 'express';

import {
  catchPosts,
  deletePosts,
  getPostsByHashtag,
  getPostsByUserId,
  likeDislikePost,
  publishPosts,
  updatePostDescription,
} from '../controllers/postsController.js';
import { sanitizeDatas } from '../middlewares/dataSanitizationMiddleware.js';
import { validateSchema } from '../middlewares/schemaValidate.js';
import { validateToken } from '../middlewares/tokenMiddleware.js';
import { postSchema } from '../schemas/postSchemas.js';

const postsRouter = Router();

postsRouter.get('/timeline/:offset', validateToken, catchPosts);
postsRouter.post(
  '/timeline',
  validateToken,
  validateSchema(postSchema),
  sanitizeDatas,
  publishPosts
);
postsRouter.delete('/delete/:id', validateToken, deletePosts);
postsRouter.post('/posts/:id/likeDislike', validateToken, likeDislikePost);
postsRouter.get('/hashtag/:hashtag/:offset', validateToken, getPostsByHashtag);
postsRouter.get('/user-posts/:id/:offset', getPostsByUserId);
postsRouter.put('/post/update/:postId', validateToken, updatePostDescription);

export default postsRouter;

import { Router } from 'express';

import {
  catchIsFollowed,
  catchNewPosts,
  catchPosts,
  deletePosts,
  getCommentsByPostId,
  getPostsByHashtag,
  getPostsByUserId,
  likeDislikePost,
  postComment,
  publishPosts,
  updatePostDescription,
} from '../controllers/postsController.js';
import { sanitizeDatas } from '../middlewares/dataSanitizationMiddleware.js';
import { validateSchema } from '../middlewares/schemaValidate.js';
import { validateToken } from '../middlewares/tokenMiddleware.js';
import { commentsSchema } from '../schemas/commentsSchemas.js';
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
postsRouter.get('/user-posts/:id/:offset', validateToken, getPostsByUserId);
postsRouter.put('/post/update/:postId', validateToken, updatePostDescription);
postsRouter.get('/posts/:id/comments', validateToken, getCommentsByPostId);
postsRouter.post(
  '/posts/:id/comments',
  validateToken,
  validateSchema(commentsSchema),
  sanitizeDatas,
  postComment
);
postsRouter.get('/timeline/isfollowed', validateToken, catchIsFollowed);
postsRouter.get('/newPosts/:timestamp', validateToken, catchNewPosts);

export default postsRouter;

import { Router } from 'express';

import {
  catchIsFollowed,
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

export default postsRouter;

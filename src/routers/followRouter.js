import { Router } from 'express';

import {
  follow,
  getFollower,
  unfollow,
} from '../controllers/followController.js';
import { validateToken } from '../middlewares/tokenMiddleware.js';

const followRouter = Router();

followRouter.get('/user/:followedId/isFollowed', validateToken, getFollower);
followRouter.post('/user/:followedId/follow', validateToken, follow);
followRouter.delete('/user/:followedId/unfollow', validateToken, unfollow);

export default followRouter;

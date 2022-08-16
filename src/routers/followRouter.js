import { Router } from 'express';
import { follow, getFollower, unfollow } from '../controllers/followController.js';

import { validateToken } from '../middlewares/tokenMiddleware.js';

const followRouter = Router();

followRouter.get('/user/:followerId/isFollowed', validateToken, getFollower);
followRouter.post('/user/:followerId/follow', validateToken, follow);
followRouter.delete('/user/:followerId/unfollow', validateToken, unfollow);


export default followRouter;

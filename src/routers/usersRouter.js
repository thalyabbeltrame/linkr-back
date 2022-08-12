import { Router } from 'express';

import {
  getUserPostsById,
  getUsersListByName,
} from '../controllers/usersController.js';
import validateToken from '../middlewares/tokenMiddleware.js';

const userRouter = Router();

userRouter.get('/search/:name', validateToken, getUsersListByName);
userRouter.get('/users/:id', getUserPostsById);

export default userRouter;

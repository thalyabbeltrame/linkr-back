import { Router } from 'express';
import validateToken from '../middlewares/tokenMiddleware.js';
import {
  getUsersListByName,
  getUserPostsById,
} from '../controllers/usersController.js';

const userRouter = Router();

userRouter.get('/search/:name', validateToken, getUsersListByName);
userRouter.get('/users/:id', getUserPostsById);

export default userRouter;

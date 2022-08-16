import { Router } from 'express';

import { getUsersListByName } from '../controllers/usersController.js';
import { validateToken } from '../middlewares/tokenMiddleware.js';

const userRouter = Router();

userRouter.get('/search/:name/:id', validateToken, getUsersListByName);

export default userRouter;

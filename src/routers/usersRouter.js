import { Router } from 'express';

import {getUsersListByName, getUserAndPostsById} from "../controllers/usersContoller.js"
import validateToken from '../middlewares/tokenMiddleware.js';

const userRouter = Router();

userRouter.get("/search/:name", validateToken ,getUsersListByName);
userRouter.get("/user-posts/:id", getUserAndPostsById)

export default userRouter;

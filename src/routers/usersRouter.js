import { Router } from "express";
import validateToken from '../middlewares/tokenMiddleware.js';
import {getUsersListByName} from "../controllers/usersContoller.js"

const userRouter = Router();

userRouter.get("/users/:name", validateToken ,getUsersListByName);

export default userRouter;
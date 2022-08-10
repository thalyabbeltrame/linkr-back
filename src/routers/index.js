import { Router } from 'express';

import authRouter from './authRouter.js';
import timelineRouter from './timelineRouter.js';
import userRouter from "./usersRouter.js"

const router = Router();
router.use('/', authRouter);
router.use('/', timelineRouter);
router.use('/', userRouter);

export default router;

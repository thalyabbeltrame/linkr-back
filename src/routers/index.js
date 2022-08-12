import { Router } from 'express';

import authRouter from './authRouter.js';
import timelineRouter from './timelineRouter.js';
import userRouter from "./usersRouter.js"
import hashTagsRouter from './hashTags.js';
const router = Router();
router.use('/', authRouter);
router.use('/', timelineRouter);
router.use('/', userRouter);
router.use('/',hashTagsRouter)

export default router;

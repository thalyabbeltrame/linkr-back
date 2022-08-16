import { Router } from 'express';

import authRouter from './authRouter.js';
import hashTagsRouter from './hashTagsRouter.js';
import postsRouter from './postsRouter.js';
import userRouter from './usersRouter.js';
import followRouter from './followRouter.js';

const router = Router();
router.use('/', authRouter);
router.use('/', userRouter);
router.use('/', postsRouter);
router.use('/', hashTagsRouter);
router.use('/', followRouter);

export default router;

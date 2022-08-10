import { Router } from 'express';

import { catchPosts } from '../controllers/timelineController.js';
import validateToken from '../middlewares/tokenMiddleware.js';

const timelineRouter = Router();

timelineRouter.get('/timeline', validateToken, catchPosts);

export default timelineRouter;

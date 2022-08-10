import { Router } from 'express';

import { catchPosts, publishPosts } from '../controllers/timelineController.js';
import validateToken from '../middlewares/tokenMiddleware.js';

const timelineRouter = Router();

timelineRouter.get('/timeline', validateToken, catchPosts);
timelineRouter.post('/timeline', validateToken, publishPosts);

export default timelineRouter;

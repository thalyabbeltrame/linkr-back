import { Router } from 'express';
import { catchPosts, deletePosts, publishPosts } from '../controllers/timelineController.js';
import validateToken from '../middlewares/tokenMiddleware.js';
import { validateSchema } from '../middlewares/schemaValidate.js';
import { postSchema } from '../schemas/postSchemas.js';

const timelineRouter = Router();

timelineRouter.get(
    '/timeline',
    validateToken,
    catchPosts);
timelineRouter.post(
    '/timeline',
    validateToken,
    validateSchema(postSchema),
    publishPosts);
timelineRouter.delete(
    '/delete/:id',
    validateToken,
    deletePosts);

export default timelineRouter;

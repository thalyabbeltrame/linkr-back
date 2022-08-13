import { Router } from 'express';

import { getTagsTrending } from '../controllers/hashTagsController.js';
import { validateToken } from '../middlewares/tokenMiddleware.js';

const hashTagsRouter = Router();

hashTagsRouter.get('/trending', validateToken, getTagsTrending);

export default hashTagsRouter;

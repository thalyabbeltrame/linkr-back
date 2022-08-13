import { Router } from 'express';

import {
  getPostsByHashtag,
  getTagsTrending,
} from '../controllers/hashTagsController.js';
import validateToken from '../middlewares/tokenMiddleware.js';

const hashTagsRouter = Router();

hashTagsRouter.get('/trending', validateToken, getTagsTrending);
hashTagsRouter.get('/hashtag/:hashtag', validateToken, getPostsByHashtag);

export default hashTagsRouter;

import { Router } from 'express';

import { allowLogin, createUser } from '../controllers/authController.js';
import sanitizeDatas from '../middlewares/dataSanitizationMiddleware.js';
import { validateSchema } from '../middlewares/schemaValidate.js';
import { signInSchema, signUpSchema } from '../schemas/authSchemas.js';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateSchema(signUpSchema),
  sanitizeDatas,
  createUser
);
authRouter.post(
  '/signin',
  validateSchema(signInSchema),
  sanitizeDatas,
  allowLogin
);

export default authRouter;

import { Router } from 'express';

import { validateSchema } from '../middlewares/schemaValidate.js';
import sanitizeDatas from '../middlewares/dataSanitizationMiddleware.js';
import { signUpSchema, signInSchema } from '../schemas/authSchemas.js';
import { allowLogin, createUser } from '../controllers/authController.js';

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

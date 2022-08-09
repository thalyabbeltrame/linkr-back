import { Router } from 'express';
import { validateSchema } from '../middlewares/schemaValidate.js';
import { signUpSchema, signInSchema } from '../schemas/authSchemas.js';
import { allowLogin, createUser } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/signup', validateSchema(signUpSchema), createUser);
authRouter.post('/signin', validateSchema(signInSchema), allowLogin);

export default authRouter;

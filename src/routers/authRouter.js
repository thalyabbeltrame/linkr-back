import { Router } from 'express'
import { validateSchema } from '../middlewares/schemaValidate.js'
import { signUpSchema } from '../schemas/authSchemas.js'
import { createUser } from '../controllers/authController.js'
const authRouter = Router()

authRouter.post('/signup', validateSchema(signUpSchema), createUser)

export default authRouter
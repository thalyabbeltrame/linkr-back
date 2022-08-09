import { Router } from 'express'
import { validateSchema } from '../middlewares/schemaValidate.js'
import { signUpSchema } from '../schemas/authSchemas.js'
const authRouter = Router()

authRouter.post('/signup',validateSchema(signUpSchema))

export default authRouter
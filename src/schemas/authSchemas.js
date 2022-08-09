import Joi from 'joi'

export const signUpSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  image: Joi.string().uri().required()
})

export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
  

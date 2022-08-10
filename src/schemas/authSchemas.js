import Joi from 'joi';

export const signUpSchema = Joi.object({
  username: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().trim().required(),
  image: Joi.string().uri().required(),
});

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().trim().required(),
});

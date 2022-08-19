import Joi from 'joi';

export const commentsSchema = Joi.object({
  comment: Joi.string().trim().required(),
});

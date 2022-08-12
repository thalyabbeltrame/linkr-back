import Joi from 'joi';

export const postSchema = Joi.object({
    link: Joi.string().uri().required(),
    text: Joi.string().allow('')
});
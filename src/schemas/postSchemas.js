import Joi from 'joi';

export const postSchema = Joi.object({
    link: Joi.string()
        .pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,256}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
        .required(),
    text: Joi.string(),
});

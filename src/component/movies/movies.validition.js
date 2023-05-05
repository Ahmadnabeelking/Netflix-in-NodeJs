import Joi from'joi';

export const add = {
    body:Joi.object().required().keys({
        Title:Joi.string().required().messages({
            'any required':'plz enter title of movie'
        }),
        Year: Joi.string().required(),
        Actors: Joi.string().required(),
        Language:Joi.string().required(),
    })
}
import Joi from'joi';

export const CreateGener = {
    body:Joi.object().required().keys({
        name:Joi.string().required().messages({
            'any required':'plz enter name of gener'
        }),
        
        moviesId:Joi.string().required(),
    })
}

export  const update = {
    params:Joi.object().required().keys({
        id:Joi.string().required()
    })
}
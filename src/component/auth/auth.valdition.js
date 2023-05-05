import Joi from'joi';

export const singup = {
    body:Joi.object().required().keys({
        name:Joi.string().required().messages({
            'any required':'plz enter user name'
        }),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(3).max(10)
    })
}

export const singin ={
    body:Joi.object().required().keys({
        email:Joi.string().email().required(),
        password: Joi.string().required().min(3).max(10)
    })
}
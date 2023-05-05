import Joi from'joi';

export const update = {
    body:Joi.object().required().keys({
        oldPassword:Joi.string().required().messages({
            'any required':'plz enter old password'
        }),
        newPassword:Joi.string().required().messages({
            'any required':'plz enter new password'
        })
       
    })
}
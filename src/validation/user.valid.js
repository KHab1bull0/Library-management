import Joi from "joi";


export const userValidation = (body) => {
   
    const schema = Joi.object({
        email: Joi.string().email().required(),
        username: Joi.string().min(3).max(20).required(),
        password: Joi.string().min(6).max(16).required(),
        role: Joi.string().optional().valid('user', 'admin', 'superadmin')
    });

    const { error, value } = schema.validate(body);

    if(error){
        throw error;
    };
    return value;

};

export const userLoginValid = (body) => {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(16).required()
    });

    const { error, value } = schema.validate(body);

    if(error){
        throw error;
    }
    return value;
}


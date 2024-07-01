import Joi from 'joi';



export const otpvalid = (body) => {
    const schema = Joi.object({
        uuid: Joi.string().required(),
        otp: Joi.string().min(6).max(6).required()
    });

    const { error, value } = schema.validate(body);

    if(error){
        throw error;
    }
    return value; 
}
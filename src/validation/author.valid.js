import Joi from 'joi';


export const authorvalid = (body) => {

    const authorSchema = Joi.object({
        name: Joi.string().required(),
        bio: Joi.string().required(),
        birthdate: Joi.date().iso().required()
    });


    const { error, value } = authorSchema.validate(body);

    if (error) {
        throw error.details;
    }
    return value;
}

import Joi from 'joi';


export const genreValid = (body) => {

    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required()
    });

    const { error, value } = schema.validate(body);

    if (error) {
        throw error.details;
    }
    return value;
}

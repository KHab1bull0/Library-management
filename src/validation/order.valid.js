import Joi from 'joi';


export const orderValid = (body) => {

    const orderSchema = Joi.object({
        items: Joi.array().items(
            Joi.object({
                bookId: Joi.string().guid({ version: 'uuidv4' }).required(),
                quantity: Joi.number().positive().integer().required()
            })
        ).required(),
    });


    const { error, value } = orderSchema.validate(body);

    if (error) {
        throw error.details;
    } else {
        return value
    }
}

export const orderValidForUpdate = (body) => {
    const schema = Joi.object({
        items: Joi.array().items(
            Joi.object({
                bookId: Joi.string().guid({ version: 'uuidv4' }).required(),
                quantity: Joi.number().integer().positive().required()
            })
        ).required(),
        status: Joi.string().optional().valid('pending', 'completed', 'canceled')
    });

    const { error, value } = schema.validate(body);

    if (error) {
        throw error.details;
    } else {
        return value
    }

}
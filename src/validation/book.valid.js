import Joi from "joi";


export const bookvalid = (body) => {

    const bookSchema = Joi.object({
        title: Joi.string().required(),
        author_id: Joi.string().guid({ version: 'uuidv4' }).required(),
        genre_id: Joi.string().guid({ version: 'uuidv4' }).required(),
        price: Joi.number().positive().required(),
        stock: Joi.number().positive().required(),
        published_date: Joi.date().iso().required(),
        status: Joi.string().valid('available', 'out of stock', 'discontinued').required(),
        image_urls: Joi.array().items(Joi.string()).required(),
        description: Joi.string().required()
      });

      const { error, value } = bookSchema.validate(body);

    if (error) {
        throw error.details;
    } else {
        return value
    }
}



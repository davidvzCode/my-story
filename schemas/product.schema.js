const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(1);
const description = Joi.string().min(3);
const image = Joi.string().uri();

//filtros
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const price_min = Joi.number().integer().min(0);
const price_max = Joi.number().integer();
//
const categoryId = Joi.number().integer();

const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    description: description.required(),
    image: image.required(),
    categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
    name,
    price,
    description,
    image,
    categoryId,
});

const getProductSchema = Joi.object({
    id: id.required(),
});

const queryProductSchema = Joi.object({
    limit,
    offset,
    price,
    price_min,
    price_max: price_max.when('price_min', {
        is: Joi.number().integer().required(),
        then: Joi.required()
    }),
});

module.exports = { createProductSchema, getProductSchema, 
    updateProductSchema, queryProductSchema};
const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(3);

const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    description: description.required(),
});

const updateProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
});

const getProductSchema = Joi.object({
    id: id.required(),
});

module.exports = { createProductSchema, getProductSchema, updateProductSchema };
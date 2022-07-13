const express = require('express');

const CustomersService = require('../services/customers.services');
const validatorHadler = require('../middleware/validator.handler');
const { createCustomerSchema, getCustomerSchema, updateCustomerSchema } = require('../schemas/constumer.schema');

const router = express.Router();

const service = new CustomersService();

router.get('/', async (req, res) => {
    const customer = await service.find();
    res.json(customer);
 });


router.get('/filter', async (req, res) => {
    res.send('filter users');
});


router.get('/:id', 
validatorHadler(getCustomerSchema, 'params'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const customer = await service.findOne(id);
            res.json(customer);
        } catch (error) {
            next(error);
        }
    }
);


router.post('/', 
validatorHadler(createCustomerSchema, 'body'),
    async (req, res, next) => {
        try {
            const body  = req.body;
            const customer = await service.create(body);
            res.status(201).json(customer);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id', 
validatorHadler(getCustomerSchema, 'params'),
validatorHadler(updateCustomerSchema, 'body'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const  body  = req.body;
            const customer = await service.update(id, body);
            res.status(201).json(customer);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id', 
validatorHadler(getCustomerSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const customer = await service.delete(id);
            res.status(201).json(customer);
        } catch (error) {
            next(error);
        }
    }
);


module.exports = router;

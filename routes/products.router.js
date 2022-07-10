const express = require('express');

const ProductsService = require('../services/products.services');
const validatorHadler = require('../middleware/validator.handler');
const { createProductSchema, getProductSchema, updateProductSchema } = require('../schemas/product.schema');

const router = express.Router();

const service = new ProductsService();

router.get('/', async (req, res) => {
   const products = await service.find();
   res.json(products);
});

//first app.get specific and after dinamic
router.get('/filter', async (req, res) => {
    res.send('filter products');
});


router.get('/:id', 
validatorHadler(getProductSchema, 'params'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const products = await service.findOne(id);
            res.json(products);
        } catch (error) {
            next(error);
        }
    }
);
//

router.post('/', 
validatorHadler(createProductSchema, 'body'),
    async (req, res) => {
        const { body } = req.body;
        const products = await service.create(body);
        res.status(201).json(products);
    }
);

router.patch('/:id', 
validatorHadler(getProductSchema, 'params'),
validatorHadler(updateProductSchema, 'body'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const  body  = req.body;
            const products = await service.update(id, body);
            res.status(201).json(products);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const products = await service.delete(id);
    res.status(201).json(products);
});

module.exports = router;



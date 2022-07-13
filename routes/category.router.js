const express = require('express');

const CategoryService = require('../services/category.services');
const validatorHadler = require('../middleware/validator.handler');
const { createCategorySchema, getCategorySchema, updateCategorySchema } = require('../schemas/category.schema');

const router = express.Router();

const service = new CategoryService();

router.get('/', async (req, res) => {
    const category = await service.find();
    res.json(category);
 });


router.get('/filter', async (req, res) => {
    res.send('filter category');
});


router.get('/:id', 
validatorHadler(getCategorySchema, 'params'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const category = await service.findOne(id);
            res.json(category);
        } catch (error) {
            next(error);
        }
    }
);


router.post('/', 
validatorHadler(createCategorySchema, 'body'),
    async (req, res, next) => {
        try {
            const body  = req.body;
            const category = await service.create(body);
            res.status(201).json(category);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id', 
validatorHadler(getCategorySchema, 'params'),
validatorHadler(updateCategorySchema, 'body'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const  body  = req.body;
            const category = await service.update(id, body);
            res.status(201).json(category);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id', 
validatorHadler(getCategorySchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const category = await service.delete(id);
            res.status(201).json(category);
        } catch (error) {
            next(error);
        }
    }
);


module.exports = router;
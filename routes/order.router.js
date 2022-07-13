const express = require('express');

const OrderService = require('../services/order.services');
const validatorHadler = require('../middleware/validator.handler');
const {
	getOrderSchema,
	createOrderSchema,
	addItemSchema,
} = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.get('/',
	async (req, res, next) => {
		try {
			const order = await service.find();
			res.json(order);
		} catch (error) {
			next(error);
		}
	}
);

router.get('/:id',
validatorHadler(getOrderSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const order = await service.findOne(id);
			res.json(order);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/',
	validatorHadler(createOrderSchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newOrder = await service.create(body);
			res.status(201).json(newOrder);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/add-item',
	validatorHadler(addItemSchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newItem = await service.addItem(body);
			res.status(201).json(newItem);
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
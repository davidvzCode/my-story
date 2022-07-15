const express = require('express');
const passport = require('passport');
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

router.post('/',
passport.authenticate('jwt', { session: false }),
validatorHadler(createOrderSchema, 'body'),
	async (req, res, next) => {
		try {
			const user = req.user;
			//const body = req.body;
			const customer = await service.findByUser(user.sub);
			const newOrder = await service.create({
				customerId: customer[0].dataValues.customerId
			});
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
const express = require('express');
const passport = require('passport');

const OrderService = require('../services/order.services');

const service = new OrderService();
const router = express.Router();


router.get('/my-order', 
passport.authenticate('jwt', { session: false }),
async (req, res, next) => {
        try {
            const user = req.user;
            const orders = await service.findByUser(user.sub);
            console.log(orders);
            res.json(orders);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;

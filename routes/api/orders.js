const express = require('express');
const router = express.Router();
const passport = require('passport');

const Order = require('../../models/Order');
const Product = require('../../models/Product');

// @route   POST api/orders
// @desc    Create an order
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const orderItems = req.body.products;
        const productIds = orderItems.map(item => item.id);
        
        // Load products
        Product.find({ '_id': { $in: productIds } })
        .then(products => {
            // Calculate total cost
            let cost = 0;
            orderItems.map(item => {
                product = products.filter(product => product.id === item.id)[0];
                
                if (product) {
                    cost += item.quantity * product.price;
                }
            });

            Order.create({
                user: req.user.id,
                products: productIds,
                cost: cost
            })
            .then(order => res.json(order))
        })
        .catch(err => console.log(err));
    }
);


// @route   GET api/orders
// @desc    Get list of client orders
// @access  Private
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Order.find({ user: req.user.id })
        .then(orders => res.json(orders))
        .catch(err => console.log(err));
    }
);

module.exports = router;
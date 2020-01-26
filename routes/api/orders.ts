import { Router } from 'express';
import { authenticate } from 'passport';
import Order from '../../models/Order';
import Product from '../../models/Product';
import validateOrderInput from '../../validations/order';

const router = Router();


// @route   POST api/orders
// @desc    Create an order
// @access  Private
router.post(
    '/',
    authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateOrderInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const orderItems = req.body.products;
        const productIds = orderItems.map((item) => item.id);

        // Load products
        return Product.find({ _id: { $in: productIds } })
            .then((products) => {
                // Calculate total cost
                let cost = 0;
                orderItems.forEach((item) => {
                    const orderProduct = products.filter((product) => product.id === item.id)[0];

                    if (orderProduct) {
                        cost += item.quantity * orderProduct.price;
                    }
                });

                return Order.create({
                    // @ts-ignore TODO
                    user: req.user.id,
                    products: productIds,
                    cost,
                })
                    .then((order) => res.json(order));
            })
            .catch((err) => console.log(err));
    },
);


// @route   GET api/orders
// @desc    Get list of client orders
// @access  Private
router.get(
    '/',
    authenticate('jwt', { session: false }),
    (req, res) => {
        // @ts-ignore TODO
        Order.find({ user: req.user.id })
            .then((orders) => res.json(orders))
            .catch((err) => console.log(err));
    },
);

export default router;

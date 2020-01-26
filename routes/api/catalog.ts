import * as express from 'express';
import Category from '../../models/Category';
import Product from '../../models/Product';

const router = express.Router();


// @route   GET /api/products/:category_id?
// @desc    Get list of products
// @access  Public
router.get('/products/:category_id?', (req, res) => {
    const { category_id } = req.params;

    if (category_id) {
        // eslint-disable-next-line @typescript-eslint/camelcase
        Product.find({ category: category_id })
            .then((products) => res.json(products))
            .catch(() => res.status(404).json({ nocategory: 'Category with this ID is no longer exists' }));
    } else {
        Product.find()
            .then((products) => res.json(products))
            .catch((err) => console.log(err));
    }
});


// @route   GET /api/products/categories
// @desc    Get list of categories
// @access  Public
router.get('/categories', (req, res) => {
    Category.find()
        .then((categories) => res.json(categories))
        .catch((err) => console.log(err));
});

export default router;

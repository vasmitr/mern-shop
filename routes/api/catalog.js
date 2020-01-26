const express = require('express');

const router = express.Router();

const Category = require('../../models/Category');
const Product = require('../../models/Product');


// @route   GET /api/products/:category_id?
// @desc    Get list of products
// @access  Public
router.get('/products/:category_id?', (req, res) => {
    const { category_id } = req.params;

    if (category_id) {
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

module.exports = router;

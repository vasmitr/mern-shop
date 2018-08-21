const express = require('express');
const router = express.Router();
const passport = require('passport');

const Category = require('../../models/Category');
const Product = require('../../models/Product');

const validateCategoryInput = require('../../validations/category');
const validateProductInput = require('../../validations/product');


// @route   POST /api/products/category
// @desc    Create category
// @access  Private
router.post(
    '/categories/create',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        let errors = {};
        
        if (!req.user.admin) {
            errors.notadmin = 'Only admin can create things there'
            return res.status(403).json(errors)
        } else {
            const { errors, isValid } = validateCategoryInput(req.body);

            if (!isValid) {
                return res.status(400).json(errors);
            }

            const newCategory = new Category({
                name: req.body.name,
                description: req.body.description,
                image: req.body.image
            });
    
            Category.create(newCategory)
            .then(category => res.json(category))
            .catch(err => console.log(err));
        }
    }
);


// @route   POST /api/products/create
// @desc    Create or product
// @access  Private
router.post(
    '/products/create',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        let errors = {}

        if (!req.user.admin) {
            errors.notadmin = 'Only admin can create things there'
            return res.status(403).json(errors)
        } else {
            const { errors, isValid } = validateProductInput(req.body);

            if (!isValid) {
                return res.status(400).json(errors);
            }

            Category.findById(req.body.category)
            .then(category => {
                if (!category) {
                    errors.category = 'Category with that ID is not longer exists'
                    res.status(400).json(errors);
                } else {
                    Product.create({
                        name: req.body.name,
                        category: req.body.category,
                        price: req.body.price,
                        description: req.body.description,
                        image: req.body.image
                    })
                    .then(product => res.json(product))
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
        }
    }
);

module.exports = router;
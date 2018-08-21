const express = require('express');
const router = express.Router();
const passport = require('passport');

const Category = require('../../models/Category');
const Product = require('../../models/Product');

const validateCategoryInput = require('../../validations/category');
const validateProductInput = require('../../validations/product');


// @route   POST /api/admin/category/:id?
// @desc    Create or update category
// @access  Private
router.post(
    '/category/:id?',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        let errors = {};
        const categoryId = req.params.id;
        
        if (!req.user.admin) {
            errors.notadmin = 'Only admin can create things there'
            return res.status(403).json(errors)
        } else {
            const { errors, isValid } = validateCategoryInput(req.body);

            if (!isValid) {
                return res.status(400).json(errors);
            }

            const categoryFields = {
                name: req.body.name,
                description: req.body.description,
                image: req.body.image
            };

            if (categoryId) {
                // Update
                Category.findByIdAndUpdate(categoryId, categoryFields)
                .then(category => res.json({category}))
                .catch(() => {
                    errors.category = 'Category with this ID is no longer exists';
                    return res.status(404).json(errors)
                })
            } else {
                // Create
                Category.create(categoryFields)
                .then(category => res.json(category))
                .catch(err => console.log(err));
            }            
        }
    }
);


// @route   POST /api/admin/product/:id?
// @desc    Create or update product
// @access  Private
router.post(
    '/product/:id?',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        let errors = {}
        const productId = req.params.product_id;

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
                    if (productId) {
                        // Update
                        Product.findByIdAndUpdate(productId, {
                            name: req.body.name,
                            category: req.body.category,
                            price: req.body.price,
                            description: req.body.description,
                            image: req.body.image
                        })
                        .then(product => res.json(product))
                        .catch(err => console.log(err));
                    } else {
                        // Create
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
                }
            })
            .catch(err => console.log(err));
        }
    }
);

module.exports = router;
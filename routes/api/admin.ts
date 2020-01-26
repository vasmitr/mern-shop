import { Router } from 'express';
import { authenticate } from 'passport';
import Category from '../../models/Category';
import Product from '../../models/Product';

import validateCategoryInput from '../../validations/category';
import validateProductInput from '../../validations/product';
import { CategoryErrors, ProductErrors } from '../../interfaces';

const router = Router();

// @route   POST /api/admin/category/:id?
// @desc    Create or update category
// @access  Private
router.post(
    '/category/:id?',
    authenticate('jwt', { session: false }),
    (req, res): Express.Response => {
        const categoryId = req.params.id;
        const { errors, isValid } = validateCategoryInput(req.body);

        // @ts-ignore TODO
        if (!req.user.admin) {
            errors.notadmin = 'Only admin can create things there';
            return res.status(403).json(errors);
        }

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const categoryFields = {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
        };

        if (categoryId) {
            // Update
            return Category.findByIdAndUpdate(categoryId, categoryFields)
                .then((category) => res.json(category))
                .catch(() => {
                    errors.category = 'Category with this ID is no longer exists';
                    return res.status(404).json(errors);
                });
        }
        // Create
        return Category.create(categoryFields)
            .then((category) => res.json(category))
            .catch((err) => console.log(err));
    },
);


// @route   POST /api/admin/product/:id?
// @desc    Create or update product
// @access  Private
router.post(
    '/product/:id?',
    authenticate('jwt', { session: false }),
    (req, res) => {
        const productId = req.params.product_id;
        const { errors, isValid } = validateProductInput(req.body);

        // @ts-ignore TODO
        if (!req.user.admin) {
            errors.notadmin = 'Only admin can create things there';
            return res.status(403).json(errors);
        }

        if (!isValid) {
            return res.status(400).json(errors);
        }

        return Category.findById(req.body.category)
            .then((category) => {
                if (!category) {
                    errors.category = 'Category with that ID is not longer exists';
                    res.status(400).json(errors);
                } else if (productId) {
                    // Update
                    Product.findByIdAndUpdate(productId, {
                        name: req.body.name,
                        category: req.body.category,
                        price: req.body.price,
                        description: req.body.description,
                        image: req.body.image,
                    })
                        .then((product) => res.json(product))
                        .catch((err) => console.log(err));
                } else {
                    // Create
                    Product.create({
                        name: req.body.name,
                        category: req.body.category,
                        price: req.body.price,
                        description: req.body.description,
                        image: req.body.image,
                    })
                        .then((product) => res.json(product))
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
    },
);


// @route   DELETE /api/admin/category/:id
// @desc    Delete category
// @access  Private
router.delete(
    '/category/:id?',
    authenticate('jwt', { session: false }),
    (req, res): Express.Response => {
        const errors: CategoryErrors = {};
        const categoryId = req.params.id;

        // @ts-ignore TODO
        if (!req.user.admin) {
            errors.notadmin = 'Only admin can delete things there';
            return res.status(403).json(errors);
        }
        return Category.findByIdAndRemove(categoryId)
            .then(() => res.json({ success: true }))
            .catch(() => {
                errors.category = 'Category with this ID is no longer exists';
                return res.status(404).json(errors);
            });
    },
);

// @route   DELETE /api/admin/product/:id
// @desc    Delete product
// @access  Private
router.delete(
    '/product/:id?',
    authenticate('jwt', { session: false }),
    (req, res) => {
        const errors: ProductErrors = {};
        const productId = req.params.id;

        // @ts-ignore TODO
        if (!req.user.admin) {
            errors.notadmin = 'Only admin can delete things there';
            return res.status(403).json(errors);
        }
        return Product.findByIdAndRemove(productId)
            .then(() => res.json({ success: true }))
            .catch(() => {
                errors.id = 'Product with this ID is no longer exists';
                return res.status(404).json(errors);
            });
    },
);


export default router;

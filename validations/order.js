const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');

module.exports = function validateOrderInput(data) {
    const errors = {};

    data.products = !isEmpty(data.products) ? data.products : '';

    if (Validator.isEmpty(data.products.toString())) {
        errors.products = 'Order requires array of product IDs';
    }

    data.products && data.products.map((product) => {
        const id = !isEmpty(product.id) ? product.id : '';
        const quantity = !isEmpty(product.quantity.toString()) ? product.quantity.toString() : '';

        if (!Validator.isMongoId(id)) {
            errors.id = 'Product ID must be a valid mongo ID';
        }

        if (Validator.isEmpty(id)) {
            errors.id = 'Any product must contain ID';
        }

        if (!Validator.isNumeric(quantity)) {
            errors.quantity = `Product quantity must be a number (id=${id})`;
        }

        if (Validator.isEmpty(quantity)) {
            errors.quantity = `Product must contain quantity (id=${id})`;
        }
    });

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

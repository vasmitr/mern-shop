const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');

module.exports = function validateCategoryInput(data) {
    const errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.image = !isEmpty(data.image) ? data.image : '';
    data.price = !isEmpty(data.price) ? data.price : '',
    data.category = !isEmpty(data.category) ? data.category : '';

    if (!Validator.isLength(data.name, { min: 3, max: 50 })) {
        errors.name = 'Name must be between 3 and 50 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (!Validator.isURL(data.image)) {
        errors.image = 'Image field must be a valid URL';
    }

    if (Validator.isEmpty(data.image)) {
        errors.image = 'Image field is required';
    }

    if (!Validator.isNumeric(data.price)) {
        errors.price = 'Price field must be a number';
    }

    if (Validator.isEmpty(data.price)) {
        errors.price = 'Price field is required';
    }

    if (!Validator.isMongoId(data.category)) {
        errors.category = 'Category must be an ID';
    }

    if (Validator.isEmpty(data.category)) {
        errors.category = 'Category field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

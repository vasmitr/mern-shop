const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');

module.exports = function validateRegisterInput(data) {
    const errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    // Name
    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    // Email
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    // Password
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password should be at least 6 characters';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords don\'t match';
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm your password';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

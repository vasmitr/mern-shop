const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // Email
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email'
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required'
    }

    // Password
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
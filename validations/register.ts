import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import { UserErrors } from '../interfaces';

export default function validateRegisterInput(data) {
    const errors: UserErrors = {};

    const formData = { ...data };

    formData.name = !isEmpty(formData.name) ? formData.name : '';
    formData.email = !isEmpty(formData.email) ? formData.email : '';
    formData.password = !isEmpty(formData.password) ? formData.password : '';
    formData.password2 = !isEmpty(formData.password2) ? formData.password2 : '';

    // Name
    if (!Validator.isLength(formData.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(formData.name)) {
        errors.name = 'Name field is required';
    }

    // Email
    if (!Validator.isEmail(formData.email)) {
        errors.email = 'Invalid email';
    }

    if (Validator.isEmpty(formData.email)) {
        errors.email = 'Email field is required';
    }

    // Password
    if (Validator.isEmpty(formData.password)) {
        errors.password = 'Password field is required';
    }

    if (!Validator.isLength(formData.password, { min: 6, max: 30 })) {
        errors.password = 'Password should be at least 6 characters';
    }

    if (!Validator.equals(formData.password, formData.password2)) {
        errors.password2 = 'Passwords don\'t match';
    }

    if (Validator.isEmpty(formData.password2)) {
        errors.password2 = 'Confirm your password';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}

import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import { UserErrors } from '../interfaces';

export default function validateRegisterInput(data) {
    const errors: UserErrors = {};
    const formData = { ...data };

    formData.email = !isEmpty(formData.email) ? formData.email : '';
    formData.password = !isEmpty(formData.password) ? formData.password : '';

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

    return {
        errors,
        isValid: isEmpty(errors),
    };
}

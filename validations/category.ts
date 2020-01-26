import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import { CategoryErrors } from '../interfaces';

export default function validateCategoryInput(data) {
    const errors: CategoryErrors = {};
    const formData = { ...data };
    formData.name = !isEmpty(formData.name) ? formData.name : '';
    formData.description = !isEmpty(formData.description) ? formData.description : '';
    formData.image = !isEmpty(formData.image) ? formData.image : '';

    if (!Validator.isLength(formData.name, { min: 3, max: 50 })) {
        errors.name = 'Name must be between 3 and 50 characters';
    }

    if (Validator.isEmpty(formData.name)) {
        errors.name = 'Name field is required';
    }

    if (!Validator.isURL(formData.image)) {
        errors.image = 'Image field must be a valid URL';
    }

    if (Validator.isEmpty(formData.image)) {
        errors.image = 'Image field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}

import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import { ProductErrors } from '../interfaces';

export default function validateCategoryInput(data) {
    const errors: ProductErrors = {};

    const formData = { ...data };

    formData.name = !isEmpty(formData.name) ? formData.name : '';
    formData.description = !isEmpty(formData.description) ? formData.description : '';
    formData.image = !isEmpty(formData.image) ? formData.image : '';
    formData.price = !isEmpty(formData.price) ? formData.price : '';
    formData.category = !isEmpty(formData.category) ? formData.category : '';

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

    if (!Validator.isNumeric(formData.price)) {
        errors.price = 'Price field must be a number';
    }

    if (Validator.isEmpty(formData.price)) {
        errors.price = 'Price field is required';
    }

    if (!Validator.isMongoId(formData.category)) {
        errors.category = 'Category must be an ID';
    }

    if (Validator.isEmpty(formData.category)) {
        errors.category = 'Category field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}

import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import { OrderErrors } from '../interfaces';

export default function validateOrderInput(data) {
    const errors: OrderErrors = {};

    const formData = { ...data };

    formData.products = !isEmpty(formData.products) ? formData.products : '';

    if (Validator.isEmpty(formData.products.toString())) {
        errors.products = 'Order requires array of product IDs';
    }

    // eslint-disable-next-line no-unused-expressions
    formData?.products.forEach((product) => {
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
}

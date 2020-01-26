const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        auto: Date.now(),
    },
});

const Product = mongoose.model('products', ProductSchema);

module.exports = Product;

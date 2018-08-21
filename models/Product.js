const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        auto: Date.now()
    }
});

module.exports = Product = mongoose.model('products', ProductSchema);
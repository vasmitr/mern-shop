const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = Schema({
    name: {
        type: String,
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

const Category = mongoose.model('categories', CategorySchema);

module.exports = Category;

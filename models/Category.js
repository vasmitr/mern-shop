const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
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

module.exports = Category = mongoose.model('categories', CategorySchema);
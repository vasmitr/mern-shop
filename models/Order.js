const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    products: {
        type: [Schema.Types.ObjectId],
        ref: 'products',
    },
    cost: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        auto: Date.now()
    }
});

module.exports = Order = mongoose.model('orders', OrderSchema);
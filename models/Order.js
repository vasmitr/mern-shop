const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    products: {
        type: [Schema.Types.ObjectId],
        ref: 'products',
    },
    cost: {
        type: Number,
        required: true,
    },
    created: {
        type: Date,
        auto: Date.now(),
    },
});

const Order = mongoose.model('orders', OrderSchema);

module.exports = Order;

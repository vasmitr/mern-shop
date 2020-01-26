import * as mongoose from 'mongoose';

export interface OrderSchema extends mongoose.Document{
    user: mongoose.Schema.Types.ObjectId;
    products: mongoose.Schema.Types.ObjectId;
    cost: number;
    created?: Date;
}

const OrderSchema: mongoose.Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    products: {
        type: [mongoose.Schema.Types.ObjectId],
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

export default mongoose.model<OrderSchema>('orders', OrderSchema);

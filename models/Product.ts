import * as mongoose from 'mongoose';

export interface ProductSchema extends mongoose.Document {
    name: string;
    category: mongoose.Schema.Types.ObjectId;
    price: number;
    image: string;
    created?: Date;
    description?: string;
}

const ProductSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.model<ProductSchema>('products', ProductSchema);

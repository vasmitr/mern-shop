import * as mongoose from 'mongoose';

export interface CategorySchema extends mongoose.Document {
    name: string;
    image: string;
    created?: Date;
    description?: string;
}


const CategorySchema: mongoose.Schema = new mongoose.Schema({
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

export default mongoose.model<CategorySchema>('categories', CategorySchema);

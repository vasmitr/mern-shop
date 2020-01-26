import * as mongoose from 'mongoose';

export interface UserSchema extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    created?: Date;
    admin?: boolean;
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        auto: Date.now(),
    },
    admin: {
        type: Boolean,
    },
});

export default mongoose.model<UserSchema>('users', UserSchema);

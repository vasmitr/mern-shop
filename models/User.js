const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
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

const User = mongoose.model('users', UserSchema);

module.exports = User;

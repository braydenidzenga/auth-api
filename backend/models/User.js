import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    banned: {
        type: Boolean,
        required: true,
        default: false,
    },
    banReason: {
        type: String,
        required: true,
        default: ""
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);
export default User;

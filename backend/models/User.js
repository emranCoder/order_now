const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    lName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        default: "user" + Date.now(),
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    pwd: {
        type: String,
        required: true,
        minlength: 8,
    },
    city: {
        type: String,
        default: 'N/A',
    },
    country: {
        type: String,
        default: 'N/A',
    },
    addr: {
        type: String,
        default: 'N/A',
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],
        default: 'user',
    },
    avatar: {
        type: String,
        default: 'default-avatar.png',
    },
    auth: [
        {
            type: Object,
            default: null,
        },
    ]
}, {
    timestamps: true,
});


const User = new mongoose.model('User', userSchema);

module.exports = User;
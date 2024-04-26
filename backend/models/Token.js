const mongoose = require('mongoose');


const tokenSchema = new mongoose.Schema({
    mail: {
        type: String,
        default: null
    },
    otp: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 300
    }
}, {
    timestamps: true,
});

const Token = new mongoose.model('Token', tokenSchema);

module.exports = Token;
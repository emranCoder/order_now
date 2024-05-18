const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    email: {
        type: String,
        default: null,
        required: true,
    },
    subject: {
        type: String,
        default: null,
        required: true,
    },
    message: {
        type: String,
        default: null,
        required: true,
    },
    status: {
        type: Boolean,
        default: false
    },
    messageDate: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
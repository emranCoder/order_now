const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [
        {
            type: String,
            required: true,
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    orderNumber: {
        type: String,
        default: null,
    },
    orderPrice: {
        type: String,
        default: null,
    },
    discount: {
        type: String,
        default: null,
    },
    paymentMethod: {
        type: String,
        default: "cash",
    },
    orderStatus: {
        type: String,
        default: "Pending"
    },
    paymentStatus: {
        type: Boolean,
        default: false,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
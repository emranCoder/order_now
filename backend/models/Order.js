const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
    ],
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

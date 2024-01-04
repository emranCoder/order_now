const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    image: {
        type: String,
        default: 'default-product.png',
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
}, {
    timestamps: true,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

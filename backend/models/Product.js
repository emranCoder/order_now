const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'default-product.png',
    }
    // You can add more fields as needed
});

// Create a model based on the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

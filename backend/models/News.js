const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        default: 'default-product.png',
    },
    like: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    disLike: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
});

const News = mongoose.model('News', newsSchema);

module.exports = News;

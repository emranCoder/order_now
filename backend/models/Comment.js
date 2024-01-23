const mongoose = require('mongoose');

// Define a schema for comments
const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create a Mongoose model based on the schema
const Comment = mongoose.model('Comment', commentSchema);

// Export the Comment model for use in other parts of your application
module.exports = Comment;

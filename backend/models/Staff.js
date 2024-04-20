const mongoose = require('mongoose');


const staffSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        default: "sa" + Date.now() + "t" + Math.random() * 10001 + "f",
    },
    mobile: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    nidNo: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    role: {
        type: String,
        enum: ['Manager', 'Head. Chef', 'Assistant Chef', 'Cleaner', 'Guard', 'Steward'],
        default: 'Steward',
    },
    wages: {
        type: String,
        trim: true,
    },
    avatar: {
        type: String,
        default: 'default-avatar.png',
    },

}, {
    timestamps: true,
});

const Staff = new mongoose.model('Staff', staffSchema);

module.exports = Staff;
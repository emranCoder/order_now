const { check } = require('express-validator');
const User = require('../../models/User');
const createHttpError = require('http-errors');

const emailValidation = [
    // Validation checks using express-validator
    check('email')
        .isEmail().trim()
        .withMessage('Invalid email format')
        .custom(async (data) => {
            try {
                const user = await User.findOne({ email: data });
                if (user) {
                    throw createHttpError("Email already use!");
                }
            } catch (error) {
                throw createHttpError(error.message);
            }
        }),
];


module.exports = { emailValidation };
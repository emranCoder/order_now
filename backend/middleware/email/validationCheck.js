const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const createHttpError = require('http-errors');

const emailValidate = [
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

const emailValidate2 = [
    // Validation checks using express-validator
    check('email')
        .isEmail().trim()
        .withMessage('Invalid email format')
        .custom(async (data) => {
            try {
                const user = await User.findOne({ email: data });

                if (!user) {
                    throw createHttpError("Email already use!");
                }
            } catch (error) {
                throw createHttpError(error.message);
            }
        }),
];


const emailValidation = (req, res, next) => {
    const errors = validationResult(req);
    const allErrors = errors.mapped();
    if (Object.keys(allErrors).length === 0) {
        next();
    } else {
        res.status(500).json({ err: allErrors });
    }
}



module.exports = { emailValidate, emailValidate2, emailValidation };
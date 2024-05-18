const express = require('express');
const path = require('path');
const fs = require('fs');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const createHttpError = require('http-errors');

const userValidates = [
    // Validation checks using express-validator
    check('fName', 'First name is required').not().isEmpty().isAlpha("en-US", { ignore: " " }),
    check('lName', 'Last name is required').not().isEmpty().isAlpha("en-US", { ignore: " " }),
    check('email')
        .isEmail()
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
    check("mobile")
        .isMobilePhone("bn-BD", { strictMode: true, })
        .withMessage("Only BD number allowed!")
        .trim().custom(async (data) => {
            try {
                const user = await User.findOne({ mobile: data });
                if (user) {
                    throw createHttpError("Number already is use!");
                }
            } catch (error) {
                throw createHttpError(error.message);
            }
        }),
    check('pwd', 'Password must be strong 8 character, mix with upper case, lowercase & with number').isStrongPassword(),
    check('dateOfBirth', 'Invalid date of birth').isISO8601(),
];





const avatarValidation = function (req, res, next) {

    const errors = validationResult(req);
    const allErrors = errors.mapped();

    if (Object.keys(allErrors).length === 0) {
        next();
    } else {

        const fileDest = '../../public/uploads/avatars/';
        if (req.files && req.files.length > 0) {
            const fileName = req.files[0].filename;
            fs.unlink(path.join(__dirname, fileDest + fileName), (err) => {
                if (err) console.log(err);
            });
        }

        res.status(500).json({ err: allErrors });
    }

}

const loginValidates = [
    check('username', 'Invalid username').not().isEmpty(),
    check('pwd', 'Password must be strong 8 character, mix with upper case, lowercase & with number').isStrongPassword(),
];


const loginValidation = (req, res, next) => {
    const errors = validationResult(req);
    const allErrors = errors.mapped();
    if (Object.keys(allErrors).length === 0) {
        next();
    } else {
        res.status(500).json({ err: allErrors });
    }
}








module.exports = { loginValidates, userValidates, avatarValidation, loginValidation };
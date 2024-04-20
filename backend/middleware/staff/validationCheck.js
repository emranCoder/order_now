const express = require('express');
const path = require('path');
const fs = require('fs');
const { check, validationResult } = require('express-validator');
const Staff = require('../../models/Staff');
const createHttpError = require('http-errors');

const staffValidates = [
    // Validation checks using express-validator
    check('fullName', 'Name is required').not().isEmpty(),
    check('nidNo')
        .not()
        .isEmpty()
        .withMessage('NID no is required')
        .custom(async (data) => {
            try {
                const staff = await Staff.findOne({ nidNo: data });
                if (staff) {
                    throw createHttpError("Already use!");
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
                const staff = await Staff.findOne({ mobile: data });
                if (staff) {
                    throw createHttpError("Number already is use!");
                }
            } catch (error) {
                throw createHttpError(error.message);
            }
        }),
];

const avatarValidation = function (req, res, next) {

    const errors = validationResult(req);
    const allErrors = errors.mapped();

    if (Object.keys(allErrors).length === 0) {
        next();
    } else {

        const fileDest = '../../public/uploads/staffs/';
        if (req.files && req.files.length > 0) {
            const fileName = req.files[0].filename;
            fs.unlink(path.join(__dirname, fileDest + fileName), (err) => {
                if (err) console.log(err);
            });
        }

        res.status(500).json({ err: allErrors });
    }

}

const stuffValidation = (req, res, next) => {
    const errors = validationResult(req);
    const allErrors = errors.mapped();
    if (Object.keys(allErrors).length === 0) {
        next();
    } else {
        res.status(500).json({ err: allErrors });
    }
}





module.exports = { staffValidates, avatarValidation, stuffValidation };
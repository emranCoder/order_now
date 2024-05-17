const path = require('path');
const fs = require('fs');
const { check, validationResult } = require('express-validator');

const couponValidates = [
    check('name', 'Invalid Coupon Name').not().isEmpty(),
    check('code', 'Invalid Code field').not().isEmpty(),
    check('discountRate', 'Invalid Discount Rate field').not().isEmpty(),
];

const couponValidation = (req, res, next) => {
    const errors = validationResult(req);
    const allErrors = errors.mapped();
    if (Object.keys(allErrors).length === 0) {
        next();
    } else {
        res.status(500).json({ err: allErrors });
    }
}




module.exports = { couponValidates, couponValidation };
const express = require('express');
const path = require('path');
const fs = require('fs');
const { check, validationResult } = require('express-validator');

const productValidates = [
    check('name', 'Invalid Product Name').not().isEmpty(),
    check('price', 'Invalid original price.').not().isEmpty(),
    check('category', 'Invalid Category.').not().isEmpty(),
];

const productValidation = (req, res, next) => {
    const errors = validationResult(req);
    const allErrors = errors.mapped();
    if (Object.keys(allErrors).length === 0) {
        next();
    } else {
        res.status(500).json({ err: allErrors });
    }
}


const imageValidation = function (req, res, next) {

    const errors = validationResult(req);
    const allErrors = errors.mapped();

    if (Object.keys(allErrors).length === 0) {
        next();
    } else {

        const fileDest = '../../public/uploads/products/';
        if (req.files && req.files.length > 0) {
            const fileName = req.files[0].filename;
            fs.unlink(path.join(__dirname, fileDest + fileName), (err) => {
                if (err) console.log(err);
            });
        }

        res.status(500).json({ err: allErrors });
    }

}


module.exports = { productValidates, productValidation, imageValidation };
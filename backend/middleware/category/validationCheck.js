const path = require('path');
const fs = require('fs');
const { check, validationResult } = require('express-validator');

const categoryValidates = [
    check('name', 'Invalid category Name').not().isEmpty(),
    check('description', 'Invalid category description').not().isEmpty(),
];

const categoryValidation = (req, res, next) => {
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

        const fileDest = '../../public/uploads/categories/';
        if (req.files && req.files.length > 0) {
            const fileName = req.files[0].filename;
            fs.unlink(path.join(__dirname, fileDest + fileName), (err) => {
                if (err) console.log(err);
            });
        }

        res.status(500).json({ err: allErrors });
    }

}


module.exports = { categoryValidates, categoryValidation, imageValidation };
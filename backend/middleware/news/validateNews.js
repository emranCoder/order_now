const { check, validationResult } = require('express-validator');

const newsValidate = [
    // Validation checks using express-validator
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Subject is required').not().isEmpty(),

];

const newsValidation = (req, res, next) => {
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

        const fileDest = '../../public/uploads/news/';
        if (req.files && req.files.length > 0) {
            const fileName = req.files[0].filename;
            fs.unlink(path.join(__dirname, fileDest + fileName), (err) => {
                if (err) console.log(err);
            });
        }

        res.status(500).json({ err: allErrors });
    }

}



module.exports = { newsValidate, newsValidation, imageValidation };
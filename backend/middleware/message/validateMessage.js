const { check, validationResult } = require('express-validator');

const messageValidate = [
    // Validation checks using express-validator
    check('email').isEmail().trim().withMessage('Invalid message format'),
    check('subject', 'Subject is required').not().isEmpty(),
    check('message', 'Subject is required').not().isEmpty(),

];

const messageValidation = (req, res, next) => {
    const errors = validationResult(req);
    const allErrors = errors.mapped();
    if (Object.keys(allErrors).length === 0) {
        next();
    } else {
        res.status(500).json({ err: allErrors });
    }
}



module.exports = { messageValidate, messageValidation };
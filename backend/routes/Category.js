const express = require('express');
const router = express.Router();
const { addCategory, getAllCategory, getCategory, updateCategory, removeCategory } = require('../controller/categoryController');
const imageUpload = require('../middleware/category/imageUpload');
const { categoryValidates, categoryValidation, imageValidation } = require('../middleware/category/validationCheck');
const authCheck = require('../middleware/authHandler');


router.post('/', authCheck, imageUpload, categoryValidates, categoryValidation, imageValidation, addCategory);
router.get('/all', getAllCategory);
router.get('/:id', getCategory);
router.put('/', authCheck, updateCategory);
router.delete('/', authCheck, removeCategory);


module.exports = router;
const express = require('express');
const router = express.Router();
const { addCategory, getAllCategory, getCategory, updateCategory, removeCategory } = require('../controller/categoryController');
const imageUpload = require('../middleware/category/imageUpload');
const { categoryValidates, categoryValidation, imageValidation } = require('../middleware/category/validationCheck');

router.post('/', imageUpload, categoryValidates, categoryValidation, imageValidation, addCategory);
router.get('/all', getAllCategory);
router.get('/:id', getCategory);
router.put('/', updateCategory);
router.delete('/', removeCategory);


module.exports = router;
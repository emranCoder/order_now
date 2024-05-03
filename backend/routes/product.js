const express = require('express');
const router = express.Router();
const { addProduct, getAllProduct, getProduct, updateProduct, removeProduct } = require('../controller/productController');
const imageUpload = require('../middleware/product/imageUpload');
const authCheck = require('../middleware/authHandler');
const { productValidates, productValidation, imageValidation } = require('../middleware/product/validationCheck');

router.post('/', authCheck, imageUpload, productValidates, productValidation, imageValidation, addProduct);
router.get('/all', getAllProduct);
router.get('/:id', getProduct);
router.put('/', authCheck, imageUpload, productValidation, imageValidation, updateProduct);
router.delete('/', authCheck, removeProduct);


module.exports = router;
const express = require('express');
const router = express.Router();
const { addProduct } = require('../controller/productController');
const imageUpload = require('../middleware/product/imageUpload');
const { productValidates, productValidation, imageValidation } = require('../middleware/product/validationCheck');

router.post('/', imageUpload, productValidates, productValidation, imageValidation, addProduct);


module.exports = router;
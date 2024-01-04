const express = require('express');
const router = express.Router();
const { addProduct, getAllProduct, getProduct, updateProduct, removeProduct } = require('../controller/productController');
const imageUpload = require('../middleware/product/imageUpload');
const authCheck = require('../middleware/authHandler');
const { productValidates, productValidation, imageValidation } = require('../middleware/product/validationCheck');

router.post('/', imageUpload, productValidates, productValidation, imageValidation, addProduct);
router.get('/all', getAllProduct);
router.get('/:id', getProduct);
router.put('/', updateProduct);
router.delete('/', removeProduct);


module.exports = router;
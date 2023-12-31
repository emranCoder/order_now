const express = require('express');
const router = express.Router();
const { placeOrder, getAllOrder, getOrder, updateOrder, removeOrder } = require('../controller/orderController');


router.post('/', placeOrder);
router.get('/all', getAllOrder);
router.get('/:id', getOrder);
router.put('/', updateOrder);
router.delete('/', removeOrder);


module.exports = router;
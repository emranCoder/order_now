const express = require('express');
const router = express.Router();
const { placeOrder, getOrder, updateOrder, getAllOrder, getUserOrder, removeOrder } = require('../controller/orderController');


router.post('/', placeOrder);
router.get('/all', getAllOrder);
router.get('/user/:id', getUserOrder);
router.get('/:id', getOrder);
router.put('/', updateOrder);
router.delete('/', removeOrder);


module.exports = router;
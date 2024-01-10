const express = require('express');
const router = express.Router();
const { placeOrder, getOrder, updateOrder } = require('../controller/orderController');


router.post('/', placeOrder);
// router.get('/all', getAllOrder);
router.get('/:id', getOrder);
router.put('/', updateOrder);
// router.delete('/', removeOrder);


module.exports = router;
const express = require('express');
const router = express.Router();
const { placeOrder, getOrder, updateOrder, getAllOrder, getUserOrder, removeOrder } = require('../controller/orderController');
const authCheck = require('../middleware/authHandler');


router.post('/', authCheck, placeOrder);
router.get('/all', authCheck, getAllOrder);
router.get('/user/:id', authCheck, getUserOrder);
router.get('/:id', authCheck, getOrder);
router.put('/', authCheck, updateOrder);
router.delete('/', authCheck, removeOrder);


module.exports = router;
const express = require('express');
const router = express.Router();
const { addCoupon, getAllCoupon, getCoupon, updateCoupon, removeCoupon } = require('../controller/couponController');
const { couponValidates, couponValidation } = require('../middleware/coupon/validationCheck');
const authCheck = require('../middleware/authHandler');


router.post('/', authCheck, couponValidates, couponValidation, addCoupon);
router.get('/all', getAllCoupon);
router.get('/:id', getCoupon);
router.put('/', authCheck, updateCoupon);
router.delete('/', authCheck, removeCoupon);


module.exports = router;
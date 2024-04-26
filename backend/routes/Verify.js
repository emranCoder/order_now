const express = require('express');
const router = express.Router();
const { sendOtp, VerifyOtp } = require('../controller/emailController');
const { emailValidation } = require('../middleware/email/validationCheck');

//ROUTE 1: Send otp:  POST "/api/verify/. No login required Auth
router.post('/', emailValidation, sendOtp);
//ROUTE 2: verify otp   POST "/api/verify/otp. No login required Auth
router.post('/otp', VerifyOtp);

module.exports = router;
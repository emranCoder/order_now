const express = require('express');
const router = express.Router();
const { loginValidates, loginValidation } = require('../middleware/user/validationCheck');
const { login, logout } = require('../controller/loginController');
const authCheck = require('../middleware/authHandler');



//ROUTE 1: Login User using:  POST "/api/login/. No login required Auth
router.post('/', loginValidates, loginValidation, login);
router.post('/logout', authCheck, logout);

module.exports = router;
const express = require('express');
const router = express.Router();
const { loginValidates, loginValidation } = require('../middleware/user/validationCheck');
const { login, logout } = require('../controller/loginController');
const authCheck = require('../middleware/authHandler');



//ROUTE 1: Login User using:  POST "/api/login/. No login required Auth
router.post('/', loginValidates, loginValidation, login);
//ROUTE 2: Logout User using:  POST "/api/login/logout. login required Auth
router.get('/logout', authCheck, logout);

module.exports = router;
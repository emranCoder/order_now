const express = require('express');
const router = express.Router();
const { loginValidates, loginValidation } = require('../middleware/user/validationCheck');
const { login, logout, reset } = require('../controller/loginController');
const authCheck = require('../middleware/authHandler');



//ROUTE 1: Login User using:  POST "/api/login/. No login required Auth
router.post('/', loginValidates, loginValidation, login);
//ROUTE 2: Logout User using:  POST "/api/login/logout. login required Auth
router.get('/logout', authCheck, logout);

//ROUTE 3: Reset password User using:  POST "/api/login/reset. No login required Auth
router.post('/reset', reset);

module.exports = router;
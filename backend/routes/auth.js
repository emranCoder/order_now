const express = require('express');
const router = express.Router();
const avatarUpload = require('../middleware/user/avatarUpload');
const { userValidates, avatarValidation, loginValidation } = require('../middleware/user/validationCheck');
const { addUser, getUser, updateUser, removeUser, getAllUser } = require('../controller/userController');
const authCheck = require('../middleware/authHandler');

//ROUTE 1: Create a User using:  POST "/api/auth/createuser". No login required Auth
router.post('/createuser', userValidates, loginValidation, addUser);

//ROUTE 2: Ge a User using:  GET "/api/auth/getuser". Login Required
router.get('/user/', authCheck, getUser);


//ROUTE 3: Update a User using:  PUT "/api/auth/updateuser". login required Auth
router.put('/updateuser', authCheck, avatarUpload, avatarValidation, updateUser);

//ROUTE 4: Delete a User using:  DELETE "/api/auth/deleteuser".login required Auth
router.delete('/deleteuser', authCheck, removeUser);

//ROUTE 5: Get a User using:  GET "/api/auth/getuser". Login Required
router.get('/getuser', authCheck, getAllUser);




module.exports = router;
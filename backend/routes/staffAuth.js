const express = require('express');
const router = express.Router();
const avatarUpload = require('../middleware/staff/avatarUpload');
const { staffValidates, avatarValidation, stuffValidation } = require('../middleware/staff/validationCheck');
const { addStaff, getStaff, updateStaff, removeStaff, getAllStaff } = require('../controller/staffController');
const authCheck = require('../middleware/authHandler');

//ROUTE 1: Create a Staff using:  POST "/api/auth/createuser". No login required Auth
router.post('/addstaff', authCheck, avatarUpload, staffValidates, stuffValidation, avatarValidation, addStaff);

//ROUTE 2: Get all Staff using:  GET "/api/auth/getstaff". Login Required From Admin
router.get('/getstaff', authCheck, getAllStaff);
//ROUTE 2: Ge a Staff using:  GET "/api/auth/getstaff". Login Required From Admin
router.get('/getstaff/:id', authCheck, getStaff);

//ROUTE 3: Update a Staff using:  PUT "/api/auth/updatestaff". Login Required From Admin
router.put('/updatestaff', authCheck, avatarUpload, stuffValidation, avatarValidation, updateStaff);

//ROUTE 4: Delete a Staff using:  DELETE "/api/auth/removestaff".Login Required From Admin
router.delete('/removestaff', authCheck, removeStaff);



module.exports = router;
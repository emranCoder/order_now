const express = require('express');
const router = express.Router();
const { placeMessage, getAllMessage, getMessage, updateMessage, removeMessage } = require('../controller/messageController');
const authCheck = require('../middleware/authHandler');
const { messageValidate, messageValidation } = require('../middleware/message/validateMessage')


router.post('/', messageValidate, messageValidation, placeMessage);
router.get('/all', authCheck, getAllMessage);
router.get('/:id', authCheck, getMessage);
router.put('/', authCheck, updateMessage);
router.delete('/', authCheck, removeMessage);


module.exports = router;
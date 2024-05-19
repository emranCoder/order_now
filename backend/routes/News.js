const express = require('express');
const router = express.Router();
const { addNews, getAllNews, getNews, updateNews, removeNews } = require('../controller/newsController');
const { newsValidate, newsValidation, imageValidation } = require('../middleware/news/validateNews');
const imageUpload = require('../middleware/news/imageUpload');
const authCheck = require('../middleware/authHandler');


router.post('/', authCheck, imageUpload, newsValidate, newsValidation, imageValidation, addNews);
router.get('/all', getAllNews);
router.get('/:id', getNews);
router.put('/', authCheck, imageUpload, imageValidation, updateNews);
router.delete('/', authCheck, removeNews);


module.exports = router;
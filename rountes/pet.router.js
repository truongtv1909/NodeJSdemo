var express = require('express');
var controller = require('../controllers/controller.pet');
var router = express.Router();

router.get('/',controller.index);
router.get('/create',controller.getCreate);
router.get('/search',controller.getSearch);
router.get('/:petid',controller.getInfomation);
router.post('/create',controller.postCreate);

module.exports = router;
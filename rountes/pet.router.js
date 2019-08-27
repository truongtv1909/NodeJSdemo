var express = require('express');
var controller = require('../controllers/controller.pet');
var router = express.Router();

router.get('/',controller.index);


module.exports = router;
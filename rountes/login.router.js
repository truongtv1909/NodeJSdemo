var express = require('express');
var controller = require('../controllers/controller.login');
var router = express.Router();

router.get('/',controller.login);
router.post('/',controller.postLogin);

module.exports = router;
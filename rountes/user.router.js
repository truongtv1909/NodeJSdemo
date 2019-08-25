var express = require('express');
var controller = require('../controllers/controller.user');
var router = express.Router();

var validate = require('../validate/user.validate');

router.get('/',controller.index);
router.get('/create',controller.getCreate);
router.get('/search',controller.getsearch);
router.get('/:userId',controller.getUserInfo);
router.post('/create',validate.potCreateUser,controller.potCreateUser);


module.exports = router;
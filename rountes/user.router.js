var express = require('express');
var multer = require('multer');
var controller = require('../controllers/controller.user');
var router = express.Router();

var upload = multer({ dest: './public/uploads/' })
var validate = require('../validate/user.validate');

router.get('/',controller.index);
router.get('/create',controller.getCreate);
router.get('/deleteUser/:id',controller.deleteUser);
router.get('/search',controller.getsearch);
router.get('/:userId',controller.getUserInfo);
router.post('/update',upload.single('avatar'),controller.postUpdate);
router.post('/create',upload.single('avatar'),validate.potCreateUser,controller.potCreateUser);


module.exports = router;
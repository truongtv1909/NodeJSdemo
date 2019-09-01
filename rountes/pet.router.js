var express = require('express');
var controller = require('../controllers/controller.pet');
var validate = require('../validate/pet.validate');
var router = express.Router();

router.get('/',controller.index);
router.get('/create',controller.getCreate);
router.get('/search',controller.getSearch);
router.get('/delete/:petId',controller.delete);
router.get('/:petid',controller.getInfomation);
router.get('/add/:cartId',controller.getaddtocart);
router.post('/create',validate.validatePostCreatePet,controller.postCreate);
router.post('/update',controller.postUpdate);


module.exports = router;
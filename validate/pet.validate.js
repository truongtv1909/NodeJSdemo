var petdb = require('../petdb');
var shortid = require('shortid');
var pets = require('../models/pet.model');

module.exports.validatePostCreatePet = function(req, res, next){
    

    var errors = [];
    var name = req.body.name;
    var image = req.body.image;
    var quanlity = parseInt(req.body.quanlity);
    var price = parseInt(req.body.price);
    var description = req.body.description;
    if(!name || !quanlity || !price || !description || !image){
        errors.push('please input full content..');
    }
    if(!quanlity){
        errors.push('Quanlity is number.. ');
        
    }
    if(!price){
        errors.push('Price is number...');
    }
    
    if(errors.length){

        res.render('pet/createpet',{
            err: errors,
            value:req.body
        });
        return;
    }


    var arr ={
        id: shortid.generate(),
        name: name,
        image: image,
        quanlity: quanlity,
        price: price,
        description: description
    };
    pets.create(arr);

    
    next();
}

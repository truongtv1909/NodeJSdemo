var petdb = require('../petdb');
var shortid = require('shortid');

module.exports.validatePostCreatePet = function(req, res, next){
    // req.body.id = shortid();
    

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
        console.log(req.body)
    }
    if(!price){
        errors.push('Price is number...');
    }
    console.log(errors);
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

    petdb.get('petdb').push(arr).write();
    next();
}

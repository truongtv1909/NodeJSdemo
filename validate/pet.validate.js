var petdb = require('../petdb');
var shortid = require('shortid');

module.exports.validatePostCreatePet = function(req, res, next){
    // req.body.id = shortid();
    console.log(req.body)

    var errors = [];
    var name = req.body.name;
    var quanlity = parseInt(req.body.quanlity);
    var price = parseInt(req.body.price);
    var description = req.body.description;
    if(!name || !quanlity || !price || !description){
        // console.log('input.............. ');
        errors.push('please input full content..');
        // res.redirect('/pet/create');
        // return;
    }
    if(typeof quanlity !== 'number'){
        errors.push('Quanlity is number.. ');
    }
    if(typeof price !== 'number'){
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
        quanlity: quanlity,
        price: price,
        description: description
    };

    petdb.get('petdb').push(arr).write();
    console.log(arr);
    next();
}

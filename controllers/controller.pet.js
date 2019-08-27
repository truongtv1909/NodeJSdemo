var petdb = require('../petdb');
var pets = petdb.get('petdb').value();
var shortid = require('shortid');

module.exports.index = function(req, res){
    res.render('pet/index',{
        pet:pets
    });
}

module.exports.getCreate = function(req,res){
 res.render('pet/createpet');
};

module.exports.postCreate = function(req,res){
    res.redirect('/pet');
};

module.exports.getSearch = function(req,res){
    var name = req.query.q.toLocaleLowerCase();
    var findpet = pets.filter(e=>e.name.toLocaleLowerCase().includes(name));
    res.render('pet/index',{
        pet:findpet
    });
};

module.exports.getInfomation = function(req,res){
    console.log(req.params.petid);
    var key = req.params.petid;
    var pet = petdb.get('petdb').find({id:key}).value();

    res.render('pet/petinfo',{
        pet:pet
    });
}
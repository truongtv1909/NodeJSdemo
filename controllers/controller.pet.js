var petdb = require('../petdb');
var pets = petdb.get('petdb').value();
var shortid = require('shortid');

module.exports.index = function(req, res){
    console.log('page is: ',req.query.page)
    var page = parseInt(req.query.page) || 1;
    var perPage = 8;
    var start = (page-1)*perPage;
    var end = (page -1)*perPage + perPage;
    var pas = Math.ceil(pets.length/perPage);
    petindex = petdb.get('petdb').value().slice(start, end);
    res.render('pet/index',{
        pet:petindex,
        numberpage: pas,
        page: page
    });
}

module.exports.getCreate = function(req,res){
 res.render('pet/createpet');
};

module.exports.postCreate = function(req,res){
    res.redirect('/pet');
};

module.exports.getSearch = function(req,res){
    // console.log(req.query.q)
    var name = req.query.q.toLocaleLowerCase();
    var findpet = pets.filter(e=>e.name.toLocaleLowerCase().includes(name));
    res.render('pet/index',{
        pet:findpet
    });
};

module.exports.getInfomation = function(req,res){
    // console.log(req.params.petid);
    var key = req.params.petid;
    var pet = petdb.get('petdb').find({id:key}).value();

    res.render('pet/petinfo',{
        pet:pet
    });
}
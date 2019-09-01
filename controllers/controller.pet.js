var petdb = require('../petdb');
var pet = require('../models/pet.model');
var pets = petdb.get('petdb').value();


module.exports.index = async function(req, res){
    // -------------------------------------------------------------------
    // var page = parseInt(req.query.page) || 1;
    // var perPage = 8;
    // var start = (page-1)*perPage;
    // var end = (page -1)*perPage + perPage;
    // var pas = Math.ceil(pets.length/perPage);
    // petindex = petdb.get('petdb').value().slice(start, end); 
    // // -------------------------------------------------------------------
    
    // res.render('pet/index',{
    //     pet:petindex,
    //     numberpage: pas,
    //     page: page
    // });

    var petsMongo = await pet.find();
    res.render('pet/index',{
        pet:petsMongo
    })
};

module.exports.getCreate = function(req,res){
 res.render('pet/createpet');
};

module.exports.postCreate = function(req,res){
    res.redirect('/pet');
};

module.exports.getSearch = async function(req,res){

    if(req.query.q){
        var name = req.query.q;
    }else{
        var name = req.query.name;
    }
    var allPet = await pet.find();

    var findpet = allPet.filter(e=>e.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
    res.render('pet/index',{
        pet:findpet
    })
};

module.exports.getaddtocart = async function(req,res, next){
    var cartId = req.params.cartId;
    var sessionId = req.signedCookies.secId;
    if(!sessionId){
        res.redirect('/pet');
        return;
    }


    var count = petdb.get('session').find({id:sessionId}).get('cart.'+cartId,0).value();

    petdb.get('session').find({id:sessionId}).set('cart.'+cartId,count + 1).write();

    res.redirect('/pet');
}

module.exports.getInfomation = async function(req,res){
    // console.log(req.params.petid);
    var key = req.params.petid;

    var allpet = await pet.find();
    
    var pet = allpet.find(function(e){
        return e.id === key;
    });

    res.render('pet/petinfo',{
        pet:pet
    });
    // var pet = petdb.get('petdb').find({id:key}).value();

    // res.render('pet/petinfo',{
    //     pet:pet
    // });
};



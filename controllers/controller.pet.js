var petdb = require('../petdb');
var pets = petdb.get('petdb').value();
var shortid = require('shortid');

module.exports.index = function(req, res){
    // -------------------------------------------------------------------
    var page = parseInt(req.query.page) || 1;
    var perPage = 8;
    var start = (page-1)*perPage;
    var end = (page -1)*perPage + perPage;
    var pas = Math.ceil(pets.length/perPage);
    petindex = petdb.get('petdb').value().slice(start, end);
    // -------------------------------------------------------------------
    
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
    var page = parseInt(req.query.page) || 1;
    var perPage = 8;
    var start = (page-1)*perPage;
    var end = (page -1)*perPage + perPage;
    if(req.query.q){
        var name = req.query.q;
    }else{
        var name = req.query.name;
    }
    
    var findpet = pets.filter(e=>e.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));

    var pas = Math.ceil(findpet.length/perPage);
    var pagePet = findpet.slice(start,end);
    res.render('pet/index',{
        pet:pagePet,
        numberpage:pas,
        page: page,
        name: name
    });
};

module.exports.getaddtocart = function(req,res, next){
    var cartId = req.params.cartId;
    var sessionId = req.signedCookies.secId;
    if(!sessionId){
        // var sessionValue = shortid.generate();
        // res.cookie('secId',sessionValue,{
        //     signed:true
        // });
        // var cart = {
        //     id: sessionValue
        // };
        // petdb.get('session').push(cart).write();
        res.redirect('/pet');
        return;
    }
    var count = petdb.get('session').find({id:sessionId}).get('cart.'+cartId,0).value();

    petdb.get('session').find({id:sessionId}).set('cart.'+cartId,count + 1).write();

    res.redirect('/pet');
}
module.exports.getInfomation = function(req,res){
    // console.log(req.params.petid);
    var key = req.params.petid;
    var pet = petdb.get('petdb').find({id:key}).value();

    res.render('pet/petinfo',{
        pet:pet
    });
};



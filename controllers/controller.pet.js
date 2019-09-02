var petdb = require('../petdb');
var pet = require('../models/pet.model');
var pets = petdb.get('petdb').value();


module.exports.index = async function(req, res){
    // -------------------------------------------------------------------
    var petsMongo = await pet.find();
    var page = parseInt(req.query.page) || 1;
    var perPage = 8;
    var start = (page-1)*perPage;
    var end = (page -1)*perPage + perPage;
    var pas = Math.ceil(petsMongo.length/perPage);

    petindex = petsMongo.slice(start, end); 
    // // -------------------------------------------------------------------

    res.render('pet/index',{
        pet:petindex,
        numberpage: pas,
        page: page
    })
};

module.exports.getCreate = function(req,res){
 res.render('pet/createpet');
};

module.exports.delete = async function(req,res){
    var petId = req.params.petId;
    await pet.remove({"_id":petId});
    res.redirect('/pet');
}

module.exports.postCreate = function(req,res){
    res.redirect('/pet');
};

module.exports.postUpdate = async function(req,res){

    var id = req.body.id;
    var item = {
        name: req.body.name,
        image: req.body.image,
        quanlity: req.body.quanlity,
        price: req.body.price,
        description: req.body.description
    };
    await pet.update({"_id":id},item);
    res.redirect('/pet');
}

module.exports.getSearch = async function(req,res){
    var name = req.query.q;

    // if(req.query.q){
    //     var name = req.query.q;
    // }else{
    //     var name = req.query.name;
    // }
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
    var key = req.params.petid;
    var petInfo = await pet.find({"_id":key});
    res.render('pet/petinfo',{
        pet: petInfo[0]
    });
};



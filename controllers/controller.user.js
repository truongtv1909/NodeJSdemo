var db = require('../db');
var user = require('../models/user.model')
var userinDB = db.get('users').value();
var shortid = require('shortid');

module.exports.index = async function(req,res){
   var users =await user.find();
    res.render('user/index',{
        user: users
    });  
};

module.exports.getCreate = function(req,res){
    res.render('user/create');
};



module.exports.getsearch = async function(req,res){
    var key = req.query.q;
    var users = await user.find();
    var newarr = users.filter(function(us){
       return us.name.toLocaleLowerCase().includes(key.toLocaleLowerCase());      
    });
    
    res.render('user/index',{
        user: newarr
    })   
};

module.exports.getUserInfo = async function(req,res){
    var idpr =req.params.userId;
    if(idpr){
        var userInfo = await user.find({"_id":idpr});
        res.render('user/info',{
            user: userInfo[0]
        });
    }else{
        res.render('user/4004');
    }
};

module.exports.deleteUser = async function(req,res){
    console.log(req);
    var id = req.params.id;
    await user.remove({"_id":id})
    res.redirect('/user');
};

module.exports.potCreateUser = async function(req,res){
    // db.get('users').push(res.locals.newuser).write();
    await user.create(res.locals.newuser);
    res.redirect('/user');  
};

module.exports.postUpdate = async function(req,res){
    var idpr =req.params.userId;
    var newUser = req.body;
    var id = newUser._id.split(' ')[1];
    console.log(id);
    var item = {
        name: newUser.name,
        phone: newUser.phone,
        about: newUser.about,
        avatar: newUser.avatar
    };
    await user.update({"_id":id},item);
    res.redirect('/user');
};

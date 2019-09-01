
var user = require('../models/user.model') 

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
    var id = req.params.id;
    await user.remove({"_id":id})
    res.redirect('/user');
};

module.exports.potCreateUser = async function(req,res){
    await user.create(res.locals.newuser);
    res.redirect('/user');  
};

module.exports.postUpdate = async function(req,res){
    var newUser = req.body;
    if(req.file){
        var avatar = req.file.path.split('public\\').join('');
    }else{
        if(newUser.avatarout){
            var avatar = newUser.avatarout
        }else{
            var avatar = 'uploads/logo'
        }   
    }
    var item = {
        name: newUser.name,
        phone: newUser.phone,
        about: newUser.about,
        avatar: avatar
    };
    await user.update({"_id":newUser._id},item);
    res.redirect('/user');
};

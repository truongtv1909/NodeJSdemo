var db = require('../db');
var userinDB = db.get('users').value();
var shortid = require('shortid');

// module.exports = {
// index: function(req,res){
//     res.render('user/index',{
//         user: userinDB
//     });  
// },
// getCreate: function(req,res){
//     res.render('user/create');
// },
// getsearch: function(req,res){
//     var key = req.query.q;
//     var newarr = userinDB.filter(function(us){
//        return us.name.toLocaleLowerCase().includes(key.toLocaleLowerCase());      
//     });
//     res.render('user/index',{
//         user: newarr
        
//     })   
// },
// getUserInfo: function(req,res){
//     var idpr =req.params.userId;
//     if(idpr){
//         var userInfo = db.get('users').find({id:idpr}).value();
//         res.render('user/info',{
//             user: userInfo
//         });
//     }else{
//         res.render('user/4004');
//     }
// },
// potCreateUser: function(req,res){
//     var namenew = req.body.na;
//     var newuser ={
//         id: shortid.generate(),
//         name: namenew,
//         about: req.body.about
//     };
//     db.get('users').push(newuser).write();
//     res.redirect('/user');  
// }
// };
// ------------------------------------------------------------------------------------
module.exports.index = function(req,res){
    res.render('user/index',{
        user: userinDB
    });  
};

module.exports.getCreate = function(req,res){
    res.render('user/create');
};

module.exports.getsearch = function(req,res){
    var key = req.query.q;
    var newarr = userinDB.filter(function(us){
       return us.name.toLocaleLowerCase().includes(key.toLocaleLowerCase());      
    });
    res.render('user/index',{
        user: newarr
        
    })   
};

module.exports.getUserInfo = function(req,res){
    var idpr =req.params.userId;
    if(idpr){
        var userInfo = db.get('users').find({id:idpr}).value();
        res.render('user/info',{
            user: userInfo
        });
    }else{
        res.render('user/4004');
    }
};

module.exports.potCreateUser = function(req,res){
    var namenew = req.body.na;
    var newuser ={
        id: shortid.generate(),
        name: namenew,
        about: req.body.about
    };
    db.get('users').push(newuser).write();
    res.redirect('/user');  
};
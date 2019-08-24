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
    var phone = req.body.phon;
    var about = req.body.about;
    var err =[];
    if(!namenew){
        err.push('Please input name');
    }
    if(!about){
        err.push('Please input about');
    }
    if(!phone){
        err.push('Please input Phone');
    }
    if(err.length){
        res.render('user/create',{
            er: err,
            value: req.body,     
        })
        return;
    }
    console.log(parseInt(phone));
    if(parseInt(phone)){
        if(phone.length===10){
             if(phone[0]==='0'){
            var newuser ={
                id: shortid.generate(),
                name: namenew,
                phone: phone,
                about: about
                };
                db.get('users').push(newuser).write();
                }else{
                    err.push('Number phone start is: 0');
                    res.render('user/create',{
                        er: err,
                        value: req.body,     
                    })
                    return; 
                }    
        }else{
            err.push('Number phone leng is: 10');
            res.render('user/create',{
                er: err,
                value: req.body,     
            })
            return;
        }
    }else{
      
        err.push('input is not number phone string');
        res.render('user/create',{
            er: err,
            value: req.body,     
        })
        return;
    }
    
    res.redirect('/user');  
};
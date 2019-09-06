var db = require('../db');
const users = require('../models/user.model');
module.exports.index = async function(req,res,next){
    var labe = ''
    var add = '';
    let userCookie = req.cookies.cooid;
    let arrUser = await users.find({'_id':userCookie});
    let user = arrUser[0];
    
    // db.get('users').find({id:req.cookies.cooid}).value();

    if(req.cookies.cooid){
        labe = 'Logout';
        // add = db.get('users').find({id:req.cookies.cooid}).value();
        add = user;
        res.render('index',{
            name:add.name.toLocaleUpperCase(),
            labes:labe
        });
    }else{
        labe = 'Login';
        add ='';
        res.render('index',{
            name:add.toLocaleUpperCase(),
            labes:labe
        });
    }
    next();
};

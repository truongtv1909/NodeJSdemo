var db = require('../db');
module.exports.index = function(req,res,next){
    var labe = ''
    var add = db.get('users').find({id:req.cookies.cooid}).value();
    if(req.cookies.cooid){
        labe = 'Logout';
    }else{
        labe = 'Login';
    }
    res.render('index',{
        name:add.name.toLocaleUpperCase(),
        labes:labe
    });
    next();
};

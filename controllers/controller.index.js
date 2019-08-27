var db = require('../db');
module.exports.index = function(req,res,next){
    var labe = ''
    var add = '';
    db.get('users').find({id:req.cookies.cooid}).value();

    if(req.cookies.cooid){
        labe = 'Logout';
        add = db.get('users').find({id:req.cookies.cooid}).value();
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

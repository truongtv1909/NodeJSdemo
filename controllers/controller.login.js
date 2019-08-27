var md5 = require('md5');
var db = require('../db');
var userinDB = db.get('users').value();

module.exports.login = function(req, res){
res.clearCookie('cooid');
res.render('login/test');
};
module.exports.postLogin = function(req, res){
var email = req.body.email;
var password = req.body.password;
var userif = db.get('users').find({email:email}).value();
var error = [];
if(!userif){
    error.push('Email is not exist');
    res.render('login/test',{
        err: error
        
    });
    return;
}
var passwordHard = md5(password);
if(userif.password !== passwordHard){
    error.push('password is wrong');
    res.render('login/test',{
        err: error
       
    });
    return;
}
res.cookie('cooid',userif.id);
res.redirect('/');
}
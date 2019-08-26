var db = require('../db');
var userinDB = db.get('users').value();
var shortid = require('shortid');

module.exports.login = function(req, res){
// console.log(req.body);
res.render('login/test');
};
module.exports.postLogin = function(req, res){
var email = req.body.email;
var password = req.body.password;
var userif = db.get('users').find({email:email}).value();
var error = [];
if(!userif){
    console.log(email);
    error.push('Email is not exist');

    res.render('login/test',{
        err: error
    });
    return;
    console.log(em);
}
console.log('us is: ',userif);
}
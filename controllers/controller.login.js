var md5 = require('md5');
var db = require('../db');
const users = require('../models/user.model');

module.exports.login = function(req, res){
res.clearCookie('cooid');
res.render('login/test');
};

module.exports.postLogin = async function(req, res){
var email = req.body.email;
var password = req.body.password;

let arrUser = await users.find({'email':email});
let userif = arrUser[0];


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
res.cookie('cooid',userif._id);
res.redirect('/');
}
 
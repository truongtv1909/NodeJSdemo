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

}
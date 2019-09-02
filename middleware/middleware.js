var db = require('../db');
var petdb = require('../petdb');
var shortid = require('shortid');
module.exports.requireLogin = function(req, res, next){
    var user_ = db.get('users').find({id:req.cookies.cooid}).value();
    if(!user_){
        res.redirect('/login');
        return;
    }
    next(); 
}

module.exports.sessionCard = function(req, res, next){
    var sessionValue = shortid.generate();
    if(!req.signedCookies.secId){
        res.cookie('secId',sessionValue,{
            signed:true
        });
        var cart = {
            id: sessionValue
        };
    petdb.get('session').push(cart).write();
    }
    next();
}

module.exports.sessionCount = function(req, res, next){
    var sessionCuren = req.signedCookies.secId;
    var ses = petdb.get('session').find({id:sessionCuren}).get('cart').size().value();
    res.locals.countCart = ses;
    next();
}
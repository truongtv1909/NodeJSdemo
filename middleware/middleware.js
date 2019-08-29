var db = require('../db');
module.exports.requireLogin = function(req, res, next){
    var user_ = db.get('users').find({id:req.cookies.cooid}).value();
    if(!user_){
        res.redirect('/login');
        return;
    }
    next(); 
}

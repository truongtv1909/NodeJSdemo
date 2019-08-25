var shortid = require('shortid');
module.exports.potCreateUser = function(req,res,next){
   
    var namenew = req.body.na;
    var phone = req.body.phon;
    var about = req.body.about;
    var phoneno = /^\d{10}$/;
    var err =[];
    if(!namenew){
        err.push('Please input name');
    }
    if(!about){
        err.push('Please input about');
    }
    if(phone.match(phoneno)){
    }else{
        err.push('invalid phone number');
    }
    if(err.length){
        res.render('user/create',{
            er: err,
            value: req.body,     
        })
        return;
    }
    res.locals.newuser = {
        id: shortid.generate(),
        name: namenew,
        phone: phone,
        about: about
        };
next();
};
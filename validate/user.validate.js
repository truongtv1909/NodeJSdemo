var shortid = require('shortid');
var multer = require('multer');
module.exports.potCreateUser = function(req,res,next){
   var body = req.body;
    var namenew = req.body.na;
    var phone = req.body.phon;
    var about = req.body.about;
    if(req.file){
        var avatar = req.file.path.split('public\\').join('');
    }else{
        var avatar = 'uploads/logo'
    }
    // var avatars = avatarString.split('public\\');
    // var avatar = avatars.join('');
    var phoneno = /^\d{10}$/;
    var err =[];
    if(!namenew){
        err.push('Please input name');
    }
    if(!about){
        err.push('Please input about');
    }
    if(phone.match(phoneno)){
    // if(!phone){
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
        // id: shortid.generate(),
        name: namenew,
        phone: phone,
        about: about,
        avatar: avatar
        };
next();
};
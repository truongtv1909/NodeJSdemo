var express = require('express');
var shortid = require('shortid');
var router = express.Router();
var db = require('../db');

var userinDB = db.get('users').value();

router.get('/',function(req,res){
    res.render('user/index',{
        user: userinDB
    });  
});

router.get('/create',function(req,res){
    res.render('user/create');
});

router.get('/search',function(req,res){
    var key = req.query.q;
    var newarr = userinDB.filter(function(us){
       return us.name.toLocaleLowerCase().includes(key.toLocaleLowerCase());
        
    });

    res.render('user/index',{
        user: newarr
        
    })
    
});

router.get('/:userId',function(req,res){
    var idpr =req.params.userId;
    if(idpr){
        var userInfo = db.get('users').find({id:idpr}).value();
        res.render('user/info',{
            user: userInfo
        });
    }else{
        res.render('user/4004');
    }
});

router.post('/create',function(req,res){
    var namenew = req.body.na;
    var newuser ={
        id: shortid.generate(),
        name: namenew,
        about: req.body.about
    };
    db.get('users').push(newuser).write();
    res.redirect('/user');  

});


module.exports = router;
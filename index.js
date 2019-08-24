var express = require('express');
var bodyparser = require('body-parser');
var shortid = require('shortid');
var app = express();
var port = 3000;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
//set db
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
db = low(adapter);
//end set

//set defaults db
db.defaults({users: []}).write();
// get db
var userinDB = db.get('users').value();

app.set('view engine','pug');
app.set('views','./views');



app.get('/',function(req,res){
    res.render('index',{
        name:'Tran Van Truong'
    });
});

app.get('/user',function(req,res){
    res.render('user/index',{
        user: userinDB
    });  
});

app.get('/user/create',function(req,res){
    res.render('user/create');
});

app.get('/user/search',function(req,res){
    var key = req.query.q;
    var newarr = userinDB.filter(function(us){
       return us.name.toLocaleLowerCase().includes(key.toLocaleLowerCase());
        
    });

    res.render('user/index',{
        user: newarr
        
    })
    
});

app.get('/user/:userId',function(req,res){
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

app.post('/user/create',function(req,res){
    var namenew = req.body.na;
    var newuser ={
        id: shortid.generate(),
        name: namenew,
        about: req.body.about
    };
    db.get('users').push(newuser).write();
    res.redirect('/user');  

});




app.listen(port,function(){
    console.log('server port is:'+port);
});
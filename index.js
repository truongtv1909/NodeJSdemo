var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var port = 3000;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


var users = [{id: 1,name: "Tran Van Truong"},
            {id: 2,name: "Nguyen Thi Hai Ha"},
            {id: 3,name: "Tran Nguyen Bao Ngoc"}];

app.set('view engine','pug');
app.set('views','./views');



app.get('/',function(req,res){
    res.render('index',{
        name:'Tran Van Truong'
    });
});

app.get('/user',function(req,res){
    res.render('user/index',{
        user: users 
    });  
});

app.get('/user/create',function(req,res){
    res.render('user/create');
});

app.post('/user/create',function(req,res){
    console.log(req.body);

});

app.get('/user/search',function(req,res){
    var key = req.query.q;
    var newarr = users.filter(function(us){
       return us.name.toLocaleLowerCase().includes(key.toLocaleLowerCase());
        
    });
    res.render('user/index',{
        user: newarr
        
    })
    
})


app.listen(port,function(){
    console.log('server port is:'+port);
});
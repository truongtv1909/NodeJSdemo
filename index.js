var express = require('express');
var bodyparser = require('body-parser');

var userRoute = require('./rountes/user.router');
var app = express();
var port = 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


app.set('view engine','pug');
app.set('views','./views');



app.get('/',function(req,res){
    res.render('index',{
        name:'Tran Van Truong'
    });
});

app.use('/user',userRoute);

app.listen(port,function(){
    console.log('server port is:'+port);
});
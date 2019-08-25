var express = require('express');
var bodyparser = require('body-parser');
var cookieperser = require('cookie-parser');

var userRoute = require('./rountes/user.router');
var app = express();
var port = 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cookieperser());

app.set('view engine','pug');
app.set('views','./views');

app.get('/',function(req,res){
    res.render('index',{
        name:'Manager App!...'
    });
});

app.use('/user',userRoute);

app.listen(port,function(){
    console.log('server port is:'+port);
});
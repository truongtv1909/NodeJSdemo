var express = require('express');
var bodyparser = require('body-parser');
var cookieperser = require('cookie-parser');

var userRoute = require('./rountes/user.router');
var userLogin = require('./rountes/login.router');
var userPet = require('./rountes/pet.router');
var middleware = require('./middleware/middleware');
var validateIndex = require('./controllers/controller.index');
var db = require('./db');
var app = express();
var port = 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cookieperser());

app.set('view engine','pug');
app.set('views','./views');


app.use('/login',userLogin);
app.use('/user',middleware.requireLogin,userRoute);
app.use('/pet',middleware.requireLogin,userPet);

app.get('/',validateIndex.index,function(req,res){
// index --- app
});
app.listen(port,function(){
    console.log('server port is:'+port);
});
var mogoose = require('mongoose');

var userSchema = new mogoose.Schema({
    name: String,
    phone: String,
    about: String,
    email: String,
    password: String,
    avatar: String
});

var User = mogoose.model('User',userSchema,'user');

module.exports = User;
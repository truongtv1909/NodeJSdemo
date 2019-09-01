var mogoose = require('mongoose');

var petSchema = new mogoose.Schema({
    name: String,
    image: String,
    quanlity: Number,
    price: Number,
    description: String
});

var Pet = mogoose.model('Pet',petSchema,'pet');

module.exports = Pet;

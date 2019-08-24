//set db
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
db = low(adapter);
//end set

//set defaults db
db.defaults({users: []}).write();

module.exports = db;
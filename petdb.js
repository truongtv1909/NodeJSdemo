//set db
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('petdb.json');
petdb = low(adapter);
//end set


//set defaults db
petdb.defaults({petdb: [],session:[]}).write();
module.exports = petdb;
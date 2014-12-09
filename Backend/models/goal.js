var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Goal = new Schema({
name: String,
body: String,
complete: Boolean
})



/*
Need methods:


*/



module.exports = mongoose.model('Goal', Goal);

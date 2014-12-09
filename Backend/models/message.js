var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Message = new Schema({
	sender_name: String,
sender: String, 
body: String,
	created_at: Date 
})



/*
Need methods:

*/


module.exports = mongoose.model('Message', Message);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var ObjectId = Schema.ObjectId;

var MatchingParams = require('./matchingparams');
var Swolationship = require('./swolationship');

var Account = new Schema({
	username: String,
	password: String,
	swolationship_id: {type: ObjectId, ref: 'Swolationship'},
	matching_params: {type: ObjectId, ref: 'MatchingParams'} 
});


/*
Need methods:
- check login + password (login, pw)->(success message, session token)
- register/create account (login, pw, email)->(success message, then check login)
- forgot password (just put a dummy link)

*/


Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);


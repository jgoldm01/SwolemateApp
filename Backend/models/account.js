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


Account.methods.validate = function(password) {
	if(password == this.password) {
		err = 0;
		// create sessionToken
	} else {
		err = 1;
	}

	return { error: err, sessionToken: token}
}




/*
Need methods:
- check login + password (pw)->(error?, session token)


- forgot password (just put a dummy link)
- register/create account (login, pw, email)->(error?, then check login)
*/


Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);


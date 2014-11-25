var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var ObjectId = Schema.ObjectId;

var MatchingParams = require('./matchingparams');
var Swolationship = require('./swolationship');

var Account = new Schema({
    username: String,
    password: String,
    paired: Boolean,
    swolationship_id: {type: ObjectId, ref: 'Swolationship'},
    matching_params: {type: ObjectId, ref: 'MatchingParams'} 
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var ObjectId = Schema.ObjectId;


var Account = new Schema({
    username: String,
    password: String,
    swolationship_id: ObjectId
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);

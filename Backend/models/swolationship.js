var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Account = require('./account.js');
var Goal = require('./goal.js');
var Message = require('./message.js');


var Swolationship = new Schema({
  user1_ID: {type: ObjectId, ref: 'Account'},
  user2_ID: ObjectId,
  goals: [Goal],
  messages: [Message],
})

module.exports = mongoose.model('Swolationship', Swolationship);

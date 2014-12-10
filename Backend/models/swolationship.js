var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Account = require('./account.js');
var Goal = require('./goal.js');
var Message = require('./message.js');


var Swolationship = new Schema({
	user1_ID: {type: ObjectId, ref: 'Account'},
	user2_ID: {type: ObjectId, ref: 'Account'},
	goals: [Goal],
	messages: [Message],
})

Swolationship.methods.unsetSwole = function () {
	//TODO
}


Swolationship.methods.setSwole = function () {
	//TODO
}

Swolationship.methods.addGoal = function () {
	//TODO
}

Swolationship.methods.retrieveGoal = function () {
	//TODO
}

Swolationship.methods.addMessage = function () {
	//TODO
}
Swolationship.methods.retrieveMessage = function () {
	//TODO
}

/*
Need methods:
- on load (session token, login)->
	(message history, active (incomplete) goals, goal history)
	- always validate session token, then run method
- add new message (message)->(history of messages)
- retrieve last 20 messages (Swolationship ID) -> (message JSON)
- Add and save goals (new GoalName, new GoalBody) -> (goalJSON) 
- Query goals (login) -> (goalJSON)
- Query messages (login) -> (messageJSON)
- unsetSwole ()
- setSwole (login of mate)->()

*/




module.exports = mongoose.model('Swolationship', Swolationship);

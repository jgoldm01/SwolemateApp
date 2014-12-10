var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Account = require('./account.js');
var Goal = require('./goal.js');
var Message = require('./message.js');


var Swolationship = new Schema({
	user1: {type: ObjectId, ref: 'Account'},
	user2: {type: ObjectId, ref: 'Account'},
	goals: [{type: ObjectId, ref: 'Goal'}],
	messages: [{type: ObjectId, ref: 'Message'}],
})

Swolationship.methods.unsetSwole = function () {
	//TODO
}


Swolationship.methods.setSwole = function () {
	//TODO
}

Swolationship.methods.addGoal = function (goalData, callback) {
	var thisSwolationship = this;
	var newGoal = new Goal({name: goalData.name,
													completed: false});
	newGoal.save(function(err) {
		if (err) {return console.error(err);}
			thisSwolationship.goals.push(newGoal);
			thisSwolationship.save(callback);
		});
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

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


Account.methods.getClosestSwolemates = function(allSwolemates) {
	var currentAccount = this;

	var tempSwolemate;	
	for (i in allSwolemates) {
		var tempDistance = currentAccount.getDistanceFrom(allSwolemates[i]);
		console.log(tempDistance);
		allSwolemates[i].distanceTo = tempDistance; 
	}
	allSwolemates.sort(compareDistances);

	return allSwolemates;
}

function compareDistances(personA, personB) {
  if (personA['distanceTo'] < personB['distanceTo']) {
    return -1;
  }
  if (personA['distanceTo'] > personB['distanceTo']) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

Account.methods.getDistanceFrom = function(otherSwolemate) {

	var currentUser = this;

	var thisLat = currentUser['matching_params']['lat'];
	var thisLng = currentUser['matching_params']['lng'];
	var otherLat = otherSwolemate['matching_params']['lat'];
	var otherLng = otherSwolemate['matching_params']['lng'];

	return haversineDistance(otherLat, otherLng, thisLat, thisLng);
}


function haversineDistance (Lat1, Lng1, myLat, myLng) {
		var radius = 3959; //miles 
		var x1 = Lat1 - myLat;  
		var dLat = toRad(x1); 
		var x2 = Lng1 - myLng;  
		var dLon = toRad(x2);
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                Math.cos(toRad(myLat)) * Math.cos(toRad(Lat1)) * 
                Math.sin(dLon/2) * Math.sin(dLon/2); 
				
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = radius * c; //d is distance
		return d; 
}


/*
Need methods:
- check login + password (pw)->(error?, session token)


- forgot password (just put a dummy link)
- register/create account (login, pw, email)->(error?, then check login)
*/


Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);


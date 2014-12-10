var async = require('async');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var ObjectId = Schema.ObjectId;

var MatchingParams = require('./matchingparams');
var Swolationship = require('./swolationship');
var Goal = require('./goal');

var Account = new Schema({
	username: String,
	password: String,
	swolationship: {type: ObjectId, ref: 'Swolationship'},
	matching_params: {type: ObjectId, ref: 'MatchingParams'} 
});




Account.methods.getClosestSwolemates = function(callback) {
	var currentAccount = this;

	var queryObject = { //we want accounts who have no swolemate, but have matching_params
													"swolationship": {"$exists" : false }, 
													"matching_params": { "$exists" : true }
												}; 
	this.model('Account').find(queryObject).
	populate('matching_params').exec(
  	function(err, docs) {
    	if (err) {return console.error(err);}
    	async.map(docs, populateDistance, function(err, finalList) {
    		async.filter(finalList, function (n, callback) {return callback(n != null)}, function(cleanList) {
    				cleanList.sort(compareDistances);
    				cleanList.shift();
    				callback(err, cleanList);
    		});
    	});

    	function populateDistance(otherSwolemate, callback) {
    			if (otherSwolemate.matching_params == null) {
    				return callback(null, null);
    			}

    			currentAccount.getDistanceFrom(otherSwolemate, function(err, distance) {
    				var newSwolemate = {
    					distanceTo: distance,
							username: otherSwolemate['username'],
    					focus: otherSwolemate['matching_params']['focus'],
    					frequency: otherSwolemate['matching_params']['frequency']
    				};
    				callback(null, newSwolemate);
    			});
    	}
   });
}


Account.methods.chooseSwolemate = function(swolemateName, callback) {
	var currentAccount = this;

	this.model('Account').findOne({username: swolemateName}).exec(function(err, otherSwolemate) {
		if (err) {return console.log(err);}
		if (otherSwolemate == null) {return console.error("Requested swolationship with bad user " + swolemateName);}
		var ourSwolationship = new Swolationship({user1: currentAccount['_id'], 
																							user2: otherSwolemate['_id']});
		ourSwolationship.save(function (err, savedSwolationship) {
			if (err) {console.error(err); return callback(err);}
			currentAccount.model('Account').update({ $or: [{username: currentAccount.username}, {username: otherSwolemate.username}] }, {swolationship: savedSwolationship._id}, {multi: true}, function (err, numUpdated, raw) {
				callback(err, raw);
			});
		})
	});
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

Account.methods.getDistanceFrom = function(otherSwolemate, callback) {

	this.populate('matching_params', function (err, currentUser) {
		var thisLat = currentUser['matching_params']['lat'];
		var thisLng = currentUser['matching_params']['lng'];
		var otherLat = otherSwolemate['matching_params']['lat'];
		var otherLng = otherSwolemate['matching_params']['lng'];

		var distance = haversineDistance(otherLat, otherLng, thisLat, thisLng);

		callback (null, distance);
	});

}

function toRad(number) {
    return number * Math.PI / 180;
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


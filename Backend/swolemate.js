var Account = require('./models/account');

var Swolationship = require('./models/swolationship');
var MatchingParams = require('./models/matchingparams');

module.exports = function(app) {
	return {

		postMatchingParams: function(req, callback) {
			var currentUser = req.user;
			var newMatchingParams = new MatchingParams(req['body']);
			console.log(newMatchingParams);
			newMatchingParams.save(
				function(err, savedMatchingParams) {
					if (err) {console.error(err); return callback(err);}
					Account.update({'username': currentUser.username}, {matching_params: savedMatchingParams._id}, {}, callback); 
				});
		},

		populateDefaultMatchingParams: function(req, callback) {
			var currentUser = req.user;
			var defaultMatchParams = new MatchingParams({
				focus: "Both",
				lat: -42,
				lng: 31,
				frequency: "1-2 Days"
			});
			defaultMatchParams.save(
				function(err) {
					if (err) {return console.error(err);}
					Account.update({'username': currentUser.username}, {matching_params: defaultMatchParams}).exec(callback); 
				});
		},

		postNewGoal: function(req, callback) {
			Swolationship.findOne({_id: req.user.swolationship}).exec(function(err, swolationship) {
			  if (swolationship == null) {return console.err("User doesn't have swolationship!");}
			  swolationship.addGoal(req.body, callback);
			});
		},

		createDashboardForUser: function (currentUser, callback) {
			console.log('generating dashboard');
			console.log(currentUser);

			callback();
		}
 
	}
}
 
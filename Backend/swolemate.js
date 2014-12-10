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
				function(err) {
					if (err) {
						console.error(err);
						callback(err);
					}
					Account.update({'username': currentUser.username}, {matching_params: newMatchingParams}).exec(callback); 
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

		listPossibleSwolemates: function(req, callback) {
			var currentUser = Account(req.user);
			var queryObject = { //we want accounts who have no swolemate, but have matching_params
													"swolationship_id": {"$exists" : false }, 
													"matching_params": { "$exists" : true }
												}; 
			Account.find(queryObject).
			populate('matching_params').exec(
      function(err, docs) {
        if (err) {return console.error(err);}
      	callback(null, currentUser.getClosestSwolemates(docs));
    	});
		},

		createDashboardForUser: function (currentUser, callback) {
			console.log('generating dashboard');
			console.log(currentUser);

			callback();
		}
 
	}
}
 
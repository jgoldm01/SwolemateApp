var Account = require('./models/account');

var Swolationship = require('./models/swolationship');
var MatchingParams = require('./models/matchingparams');

module.exports = function(app) {
  return {

  initMatchingParams: function(currentUser, callback) {
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

  createDashboardForUser: function (currentUser, callback) {
    console.log('generating dashboard');
    console.log(currentUser);
    
    callback();
  }


  }

}
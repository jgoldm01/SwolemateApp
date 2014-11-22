var Account = require('./models/account');

var Swolationship = require('./models/swolationship');

module.exports = function(app) {
  return {

    createDashboardForUser: function (currentUser, callback) {
      console.log('generating dashboard');
      console.log(currentUser);
      
      callback();
    }

  }

}
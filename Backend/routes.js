var passport = require('passport');
var Account = require('./models/account');



module.exports = function (app) {

var Swolemate = require('./swolemate.js')(app);

app.get('/', function (req, res) {
	var display = '';
	if (req['query']['error'] == 'nologin') {
		display = "Error: please login before proceeding"; 
	}
	res.render('index', { user : req.user, display : display });
});

app.get('/register', function(req, res) {
	res.render('register', { });
}); 

app.post('/register', function(req, res) {
	Account.register(
		new Account({ username : req.body.username }), 
		req.body.password, 
		function(err, account) {
			if (err) {
				console.log("Error in Register!");
				console.log(err);
				return res.render('register', { info : err });
			}
			console.log("Registered");
			passport.authenticate('local', 
							{ successRedirect: '/newuser',
							failureRedirect: '/login' })(req,res);
		}
	);
});

  app.get('/login', function(req, res) {
	 res.render('login', { user : req.user });
  });

  app.post('/login', passport.authenticate('local'), function(req, res) {
	 res.redirect('/');
  });

  app.get('/getstarted', function(req, res) {
	 var user = req.user;
	 if (!user) {
		res.redirect('/?error=nologin');
	 }

	 function returnJSON(err, jsonData) {
		if (err) {throw err};
		res.json(jsonData);
	 };
	 Swolemate.initMatchingParams(user, returnJSON);
  });



//API ENDPOINTS - ALL SEND JSON BACK

  app.get('/api/user', function(req, res) {
	 var user = req.user;
	 if (!user) {
		res.redirect('/?error=nologin');
	 }
	 res.json(user);
  });

  app.get('/api/user/matchingparams', function (req, res) {
	 var user = req.user;
	 if (!user) {
		res.redirect('/?error=nologin');
	 }
	 Account(user).populate('matching_params', function(err, mp) {
		res.json(mp.matching_params);
	 });
  });

  app.post('/api/user/matchingparams', function (req, res) {
	 var user = req.user;
	 if (!user) {
		res.redirect('/?error=nologin');
	 }

	 function echoJSON (err, finalJSON) {
		if (err) {
		  res.status(500);
		  return res.json(err);
		}
		res.json(finalJSON);
	 }

	 Swolemate.postMatchingParams(req, echoJSON);
	 

  });

  app.get('/logout', function(req, res) {
	 req.logout();
	 res.redirect('/');
  });

  app.get('/ping', function(req, res){
	 console.log("pinging");
	 res.status(200).send("pong!");
  });

  app.get('/api/swolationship/:id([0-9a-f]{24})', function(req, res){
	 var idRequested = req.params['id'];
	 
  });

//This is the API endpoint for dashboard, which sends back the fully populated
//user account JSON. Not to be confused with the HTML endpoint for dashboard,
//which sends back the template for the dashboard page 
  app.get('/api/dashboard', function(req, res) {
	 var user = req.user;
	 if (!user) {
		res.redirect('/?error=nologin');
	 }

	 function sendEmptyDashboard () {
		res.render('dashboard', {});
	 }
	 Swolemate.createDashboardForUser(user, sendEmptyDashboard);

  });

};

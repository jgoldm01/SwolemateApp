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

//             ----                               ----
//                  REGISTRATION and LOGIN ROUTES
//             ----                               ----

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
  							{ successRedirect: '/getstarted',
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

  app.get('/logout', function(req, res) {
   req.logout();
   res.redirect('/');
  });


//             ----                               ----
//                          HTML ROUTES 
//             ----                               ----

  app.get('/getstarted', function(req, res) {
	  var user = req.user;
	  if (!user) {
		  return res.redirect('/?error=nologin');
	  }

    res.render('getstarted');
  });

  //This is the HTML endpoint for Dashboard, which sends back the template,
  //rendered in jade, of the dashboard, to be populated by angular's call to
  //the dashboard API
  app.get('/dashboard', function(req, res) {
    var user = req.user;
    if (!user) {
      res.redirect('/?error=nologin');
    }

    function sendEmptyDashboard () {
      res.render('dashboard', {});
    }

    Swolemate.createDashboardForUser(user, sendEmptyDashboard);
  });

  app.get('/swolefinder', function(req, res) {
    var user = req.user;
    if (!user) {
      return res.redirect('/?error=nologin');
    }

    res.render('swolefinder', {});

  });

//             ----                               ----
//                API ROUTES - ALL SEND JSON BACK
//             ----                               ----

  app.get('/api/user', function(req, res) {
	  var user = req.user;
	  if (!user) {
		  return res.redirect('/?error=nologin');
	  }

    function sendBackJSON (err, data) {
      if (err) {return console.error(err);}

      res.json(data);
    }

    user.populate('matching_params', sendBackJSON);

  });

  app.get('/api/user/matchingparams', function (req, res) {
	  var user = req.user;
	  if (!user) {
		  return res.redirect('/?error=nologin');
	  }
	  Account(user).populate('matching_params', function(err, mp) {
		  res.json(mp.matching_params);
	  });
  });

  app.post('/api/user/matchingparams', function (req, res) {
	  var user = req.user;
	  if (!user) { // if there's no user, gettouttahere!
		  return res.redirect('/?error=nologin');
	  }
    
    Swolemate.postMatchingParams(req, sendSuccess);

	  function sendSuccess (err, numChanged, raw) {
		  if (err) {
		    res.status(500);
		    return res.json(err);
		  }
      else {
        var finalJSON = {
          success: true,
          raw: raw,
          message: "Working..."
        }
		    return res.json(finalJSON);
      }
	  }

  });

//This is the API endpoint for dashboard, which sends back the fully populated
//user account JSON. Not to be confused with the HTML endpoint for dashboard,
//which sends back the template for the dashboard page 
  app.get('/api/user/dashboard', function(req, res) {
    var user = req.user;
    if (!user) {
    res.redirect('/?error=nologin');
    }

    function returnJSON(err, jsonData) {
      if (err) {throw err};
      res.json(jsonData);
    };

   Swolemate.createDashboardForUser(user, returnJSON);
  });

  app.get('/api/swolefinder', function(req, res) {
    
    if (!req.user) {
      return res.redirect('/?error=nologin');
    }

    function echoJSON(err, data) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      res.json(data);
    }

    req.user.getClosestSwolemates(echoJSON);

  });

  app.post('/api/chooseswolemate', function(req, res) {
    if (!req.user) {
      return res.redirect('/?error=nologin');
    }

    function echoJSON(err, data) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      res.json(data);
    }
    req.user.chooseSwolemate(req['body']['username'], echoJSON);

  });

  app.get('/api/swolationship', function(req, res) {
    if (!req.user) {
      return res.redirect('/?error=nologin');
    }

    function sendBackJSON(err, data) {
      if (err) {return console.error(err)}

      res.json(data);
    }

    req.user.populate('swolationship', function(err, populatedCurrentUser) {
      populatedCurrentUser.swolationship.populate('user1', function(err, populatedSwolationship) {
        populatedSwolationship.populate('user2', function(err, populatedSwolationship) {
          populatedSwolationship.populate('goals', function(err, populatedSwolationship) {
            populatedSwolationship.populate('messages', sendBackJSON);
          });
        });
      });
    })

  });


  app.get('/api/swolationship/goal', function(req, res){
    //get a list of all goals

  });

  app.post('/api/swolationship/goal', function(req, res) {
    if (!req.user) {
      return res.redirect('/?error=nologin');
    }

    function echoJSON(err, data) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      res.json(data);
    }

    Swolemate.postNewGoal(req, echoJSON);

  });

  app.put('/api/swolationship/goal/:id', function(req, res) {
    //update a goal

  });



  app.get('/api/swolationship/:id([0-9a-f]{24})', function(req, res){
	  var idRequested = req.params['id'];
  });



  app.get('/ping', function(req, res){
    console.log("pinging");
    res.status(200).send("pong!");
  });

};

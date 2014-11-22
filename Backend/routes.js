var passport = require('passport');
var Account = require('./models/account');



module.exports = function (app) {

  var Swolemate = require('./swolemate.js')(app);

  app.get('/', function (req, res) {
      res.render('index', { user : req.user });
  });

  app.get('/register', function(req, res) {
      res.render('register', { });
  });

  app.post('/register', function(req, res) {
    Account.register(
      new Account({ username : req.body.username }), 
      req.body.password, function(err, account) {
        if (err) {
            console.log("Error in Register!");
            console.log(err);
            return res.render('register', { info : err });
        }
        console.log("Registered");
        passport.authenticate('local', 
                              { successRedirect: '/',
                                failureRedirect: '/login' })(req,res);
        
    });
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

  app.get('/ping', function(req, res){
      console.log("pinging");
      res.status(200).send("pong!");
  });

  app.get('/swolationship/:id([0-9a-f]{24})', function(req, res){
      var idRequested = req.params['id'];
      
  });

  app.get('/dashboard', function(req, res) {
      var user = req.user;

      function sendEmptyDashboard () {
        res.render('dashboard', {});

      }

      if (user) {
        Swolemate.createDashboardForUser(user, sendEmptyDashboard);
      }
      else {
        res.redirect('/');
      }

  });

};

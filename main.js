var express = require('express'),
    http = require('http'),
    request = require('request'),
    errorHandler = require('express-error-handler'),
    app = express();
    connect = require('connect'),
    Console = require('console');
var logFmt = require("logfmt");
var path = require('path');
//var auth = require('./auth');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var passport = require('passport');

passport.use('./config.json', new SamlStrategy(new SamlStrategy(
    {
      callbackUrl : config.auth.callbackUrl,
      entryPoint: config.auth.entryPoint,    
      issuer: config.auth.issuer,
      cert:  config.auth.cert
    },
    function(profile, done) {
      console.log('Succesfully Profile' + profile);
      if (!profile.email) {
          return done(new Error("No email found"), null);
      }
      process.nextTick(function() {
          console.log('process.nextTick' + profile);
          findByEmail(profile.email, function(err, user) {
              if (err) {
                  return done(err);
              }
              if (!user) {
                  users.push(profile);
                  return done(null, profile);
              }
              console.log('Ending Method for profiling');
              return done(null, user);
          })
      });
    }
  )), callback);

  app.post('/login/callback',
  function(req, res) {
      var config = // extract config name somehow
      passport.authenticate(config, { failureRedirect: '/', failureFlash: true })();
  },
  function(req, res) {
    res.redirect('/');
  }
);

/*
//Lets call passport authenticate method to authenticate 
app.get('/login', auth.authenticate('saml', { failureRedirect: '/', failureFlash: true }), function(req, res) {
    res.redirect('/');
});

//POST Methods, redirect to home successful login
app.post('/login/callback', auth.authenticate('saml', { failureRedirect: '/', failureFlash: true }), function(req, res) {
    res.redirect('/workorder');
});

//Get Methods
app.get('/', auth.protected, function(req, res) {
    res.sendfile('views/login_page.html', {root: __dirname });       
});

app.get('/workorder', auth.protected, function(req, res) {
    res.sendfile('views/create_workorder.html', {root: __dirname });   
});

app.get('/register' , function(req,res) {
    res.sendfile('views/register.html', {root: __dirname });   
});
*/
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieSession({secret: 'app_1'}));
app.use(connect.compress());
app.use(express.session({ secret: "won't tell because it's secret"  }));
app.use(express.logger());
app.use(errorHandler());
app.use(auth.initialize());
app.use(auth.session());
app.use(express.static(__dirname + '/client')); 
var currentPort = app.listen(process.env.PORT || 3000);

/*
//1337
app.set('port', process.env.PORT || 1337);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

*/
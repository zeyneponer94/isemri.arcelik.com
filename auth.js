var passport = require('passport');
var SamlStrategy = require('passport-saml').Strategy;
var util = require('util')
var wsfedsaml2 = require('./client/lib/passport-wsfed-saml2/index').Strategy
var fs = require('fs');

var config = require('./config.json');


var users = [];

function findByEmail(email, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.email === email) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(id, done) {
  findByEmail(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new SamlStrategy(
  {
    path : config.auth.path,
    entryPoint: config.auth.entryPoint,    
    issuer: config.auth.issuer,
    cert:  config.auth.cert
  },
  function(profile, done) {
    return done(new Error("No email found"), null);
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
));

passport.protected = function protected(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

 exports = module.exports = passport;


var passport = require('passport'),
	  fs = require('fs'),
    SamlStrategy = require('passport-saml').Strategy,
    config = require('./config.json');

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

function convertCertificate (cert) {
    //Certificate must be in this specific format or else the function won't accept it
    var beginCert = "-----BEGIN CERTIFICATE-----";
    var endCert = "-----END CERTIFICATE-----";

    cert = cert.replace("\n", "");
    cert = cert.replace(beginCert, "");
    cert = cert.replace(endCert, "");

    var result = beginCert;
    while (cert.length > 0) {

        if (cert.length > 64) {
            result += "\n" + cert.substring(0, 64);
            cert = cert.substring(64, cert.length);
        }
        else {
            result += "\n" + cert;
            cert = "";
        }
    }

    if (result[result.length ] != "\n")
        result += "\n";
    result += endCert + "\n";
    return result;
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
    issuer: config.auth.issuer,
  	path: '/login/callback',
    entryPoint: config.auth.entryPoint,
    cert: fs.readFileSync(config.auth.cert, 'utf-8'),
	signatureAlgorithm: 'sha256'
  },
  function(profile, done) {
    if (!profile.email) {
      return done(new Error("No email found"), null);
    }
    process.nextTick(function () {
      findByEmail(profile.email, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          users.push(profile);
          return done(null, profile);
        }
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
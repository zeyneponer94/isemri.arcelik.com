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
    issuer: config.auth.issuer,
    entryPoint: config.auth.entryPoint,
    cert: config.auth.cert
/*
    path: '/login/callback',
    realm: 'urn:node:app',
    homeRealm: '', // specify an identity provider to avoid showing the idp selector
    identityProviderUrl: 'https://arcelik.oktapreview.com/app/arelika_thworkorder_1/exkekmgyymcDj2lqE0h7/sso/saml',
    // setup either a certificate base64 encoded (cer) or just the thumbprint of the certificate if public key is embedded in the signature
    cert: "MIIDnjCCAoagAwIBAgIGAV2rzMGVMA0GCSqGSIb3DQEBCwUAMIGPMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxEDAOBgNVBAMMB2FyY2VsaWsxHDAaBgkqhkiG9w0BCQEWDWluZm9Ab2t0YS5jb20wHhcNMTcwODA0MDU1MDQ5WhcNMjcwODA0MDU1MTQ4WjCBjzELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xDTALBgNVBAoMBE9rdGExFDASBgNVBAsMC1NTT1Byb3ZpZGVyMRAwDgYDVQQDDAdhcmNlbGlrMRwwGgYJKoZIhvcNAQkBFg1pbmZvQG9rdGEuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjE+Gks+A9HJw1s3A8qqfiYGCNekrGOcApzZkyexZQEANM2pEAE52mq8RwdcuEQKnQkQ7kdSrTnoLbBv/lEFY90X0vGsvGPM1VWRTUpGk+YhP/Hdx7Xv+LZeRl2fFj6b13UWypXBbihpkLJ24XKWEcuEjNAwIJVZGD2Fwp7kI6H22oeodTodOxp49Xh1/aWaKQ/JHWUSVDe0Al1+SoxvW7i9fYmr35xi+Y5ZkKKoEYmnCpURCxLmC1MXuzvn9biIRjrupJGx/JafKukFX/lTQGHEr/lSeoOWUgezS6DRE2xexAVuyaCEe0h1l9rg1o2goyxXFWNCc5flN0O6EOdig1QIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQAoWHH7xxvaxbH8M1SYp3n3NeIliPPILSqwL1jv9DQRcHuTRfAXbLOebxMnyiFFH/1f7C8vtpQB/EW+lxf3CSbrQz6qaVy7NBE4QwiyxnWTF8y+/6sxthXcrPXAmk/4al6H0Tp1vNvO1/Ir93A4b9Qc2yZ+Txb8JRiHNuBJ2QCBIfQDx0CoQMYqKynuwbhvOTi7hpuxRYvNcpZGjo7KS1XrK8oW+pOHKpdxl2TLHgh42zkMGJ6m8qp63DFPWpqOjgLMQ5ETlxcUQdqiY6Lf2V7Stmcw0F8uqnJNr1WnAdKaw9uBAtSuFKNCvGMF3oFWXoBQjEjpS8san/vX+X/uuukI"    
    */
  },
  function(profile, done) {

    return done(null, user);
 /*   
    console.log('Succesfully Profile' + profile);    
    if (!profile.email) {
      console.log('No email found');
      return done(new Error("No email found"), null);
    }
    process.nextTick(function () {
      console.log('email found');      
      findByEmail(profile.email, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          console.log('push user');                
          users.push(profile);
          return done(null, profile);
        }
        return done(null, user);
      })
    });*/

  }
));

passport.protected = function protected(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

 exports = module.exports = passport;


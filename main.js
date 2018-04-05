var express = require('express'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    errorHandler = require('express-error-handler'),
    app = express();
    connect = require('connect'),
    auth = require('./auth.js');
    Console = require('console');
var logFmt = require("logfmt");
var path = require('path');

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



/*
app.post('/submit',function(req,res){
    //res.send(req.body['g-recaptcha-response']);    
    // g-recaptcha-response is the key that browser will generate upon form submit.
    // if its blank or null means user has not selected the captcha, so return the error.
    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
      return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
    }

    // Put your secret key here.
    var secretKey = "6LfuDE8UAAAAAAH7G69uBc7aONOVQ4d23A24Hiu5";
    // req.connection.remoteAddress will provide IP address of connected user.
    var verificationUrl = "https://thworkorderfapp.azurewebsites.net/google_captcha?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    // Hitting GET request to the URL, Google will respond with success or error scenario.
    request(verificationUrl,function(error,response,body) {
      body = JSON.parse(body);
      // Success will be true or false depending upon captcha validation.
      if(body.success !== undefined && !body.success) {
        return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
      }
      return res.json({"responseCode" : 0,"responseDesc" : "Success"});
    });
  });*/

app.get('/register' , function(req,res) {
    res.sendfile('views/register.html', {root: __dirname });   
});

app.use(express.static(__dirname + '/client')); 
app.use(errorHandler());
app.use(express.logger());
app.use(connect.compress());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(auth.initialize());
app.use(auth.session());
app.use(express.session({ secret: "won't tell because it's secret"  }));
var currentPort = app.listen(process.env.PORT || 3000);

/*
//1337
app.set('port', process.env.PORT || 1337);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

*/
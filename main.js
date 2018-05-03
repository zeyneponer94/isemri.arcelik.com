


/*var express = require('express'),
    http = require('http'),
    request = require('request'),
    errorHandler = require('express-error-handler'),
    app = express();
    connect = require('connect');
var passport = require("passport");
var logFmt = require("logfmt");
var path = require('path');
var auth = require('./auth');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var redirect = require('./redirect.js');



app.use(express.logger());
app.use(connect.compress());
app.use(cookieParser());
app.use(cookieSession({secret: 'app_1'}));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(errorHandler());
app.use(express.session({ secret: "won't tell because it's secret"  }));
app.use(auth.initialize());
app.use(auth.session());*/


var express = require('express');
var connect = require('connect');
var auth = require('./auth');
var path = require('path');

var app = express();

app.configure(function() {
    app.use(express.logger());
    app.use(connect.compress());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: "won't tell because it's secret"  }));
    app.use(auth.initialize());
    app.use(auth.session());
});



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
    res.send(req.definitions);
    res.cookie('user', '' + req.session.passport.user, { maxAge: 900000, httpOnly: false });       
    res.sendfile('views/create_workorder.html', {root: __dirname });   
});

//Get Methods
app.get('/home', function(req, res) {
    res.sendfile('views/home.html', {root: __dirname });       
});

app.get('/register' , function(req,res) {
    res.sendfile('views/register.html', {root: __dirname });   
});

app.use(express.static(__dirname + '/client')); 
var currentPort = app.listen(process.env.PORT || 3000);

/*
//1337
app.set('port', process.env.PORT || 1337);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

*/


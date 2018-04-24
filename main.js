var express = require('express'),
    http = require('http'),
    request = require('request'),
    errorHandler = require('express-error-handler'),
    app = express();
    connect = require('connect'),
    Console = require('console');
var logFmt = require("logfmt");
var path = require('path');
var auth = require('./auth');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var redirect = require('./redirect.js');




app.use(express.logger());
app.use(connect.compress());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(errorHandler());
app.use(express.session({ secret: "won't tell because it's secret"  }));
app.use(auth.initialize());
app.use(auth.session());

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

*/

//Get Methods
app.get('/', function(req, res) {
    res.sendfile('views/home.html', {root: __dirname });       
});
 /*

app.get('/workorder', function(req, res) {
    res.sendfile('views/create_workorder.html', {root: __dirname });  

});*/

//app.all('/workorder', (req, res) => redirect.Authentication(req, res))


app.get('/register' , function(req,res) {
    res.sendfile('views/register.html', {root: __dirname });   
});


//app.use(auth.initialize());
//app.use(auth.session());
app.use(express.static(__dirname + '/client')); 
var currentPort = app.listen(process.env.PORT || 3000);

/*
//1337
app.set('port', process.env.PORT || 1337);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

*/


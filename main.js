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
app.get('/login', auth.authenticate('saml', { failureRedirect: '/fail', failureFlash: true }), function(req, res) {
    res.redirect('/');
});

//POST Methods, redirect to home successful login
app.post('/login/callback', auth.authenticate('saml', { failureRedirect: '/fail', failureFlash: true }), function(req, res) {
    res.redirect('/');
});

//Get Methods
app.get('/', auth.protected, function(req, res) {
    res.send(req.sessionID);
    //res.cookie('user', '' + req.user.nameID, { maxAge: 900000, httpOnly: false });           
    //res.sendfile('views/create_workorder.html', {root: __dirname });   
});

/*
app.get('/workorder', auth.protected, function(req, res) {
    res.cookie('user', '' + req.user.nameID, { maxAge: 900000, httpOnly: false });       
    res.sendfile('views/create_workorder.html', {root: __dirname });   
});*/

app.get('/fail', function(req, res) {
    res.send("Request Failed");       
});

/*
//Get Methods
app.get('/home', function(req, res) {
    res.sendfile('views/home.html', {root: __dirname });       
});

app.get('/register' , function(req,res) {
    res.sendfile('views/register.html', {root: __dirname });   
});
*/
app.use(express.static(__dirname + '/client')); 
var currentPort = app.listen(process.env.PORT || 3000);


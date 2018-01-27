var express = require('express'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    errorHandler = require('express-error-handler'),
    app = express();

var logFmt = require("logfmt");

//app.set('views', __dirname + '/views') ;

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/views/index.html');    
});

app.get('/views/redirect.html' , function(req,res) {
    //res.sendfile(__dirname + '/views/redirect.html');
    res.sendfile('https://thworkorder.azurewebsites.net/redirect.html');
});


app.set('port', process.env.PORT || 1337);

app.use(express.static(__dirname + '/client')); 
app.use(errorHandler());
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


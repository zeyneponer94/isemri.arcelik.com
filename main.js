var express = require('express'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    errorHandler = require('express-error-handler'),
    app = express();
    Console = require('console');


var cors = require('cors');
app.use(cors());
app.use(enableCors);

function enableCors(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods',  'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Credentials', 'true');    
    
    // Content-Length, X-Requested-With, Access-Control-Allow-Headers,X-Auth-Token,X-CSRF-TOKEN 
    if('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
}

var logFmt = require("logfmt");

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/views/login_page.html');      
});
app.get('/workorder' , function(req,res) {
    res.sendfile('views/create_workorder.html', {root: __dirname });   
});

app.get('/register' , function(req,res) {
    res.sendfile('views/register.html', {root: __dirname });   
});


app.set('port', process.env.PORT || 1337);
app.use(express.static(__dirname + '/client')); 
app.use(errorHandler());
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


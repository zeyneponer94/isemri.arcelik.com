var express = require('express'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    errorHandler = require('express-error-handler'),
    app = express();
    Console = require('console');

var logFmt = require("logfmt");

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/views/login_page.html');      
});
app.get('/workorder' , function(req,res) {
    res.sendfile('views/create_workorder.html', {root: __dirname });   
});

app.all('/api/*', function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    response.header("Access-Control-Allow-Methods", "GET, POST", "PUT", "DELETE");
    next();
  });

app.set('port', process.env.PORT || 1337);
app.use(express.static(__dirname + '/client')); 
app.use(errorHandler());
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


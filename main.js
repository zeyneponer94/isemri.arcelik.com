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


        res.header('Access-Control-Allow-Origin: https://yetkiliservis-test.arcelik.com/wsaftersales/ServicePaperService.svc/ProductOrderOperationService, https://thworkorder.azurewebsites.net'); 
        res.header("Access-Control-Allow-Credentials: true");
        res.header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers: Accept,Access-Control-Allow-Headers,Access-Control-Allow-Origin,Access-Control-Allow-Methods, Access-Control-Max-Age,Origin, Content-Type, X-Auth-Token , Authorization,SessionToken,Cache-Control,servicetype');
        res.send(200);

}

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

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


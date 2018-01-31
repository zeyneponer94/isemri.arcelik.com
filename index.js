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
     
    var options = { method: 'POST',
    url: 'https://yetkiliservis-test.arcelik.com/wsaftersales/ServicePaperService.svc/ProductOrderOperationService',
    headers: 
       { 'Postman-Token': 'c230d62e-929c-ea04-b8bd-0bb04af28c12',
         'Cache-Control': 'no-cache',
         SessionToken: 'Guld',
         'Content-Type': 'application/x-www-form-urlencoded' } };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      alert(body);
});

app.get('/workorder' , function(req,res) {
    res.sendfile('views/redirect.html', {root: __dirname });   
});





});


app.set('port', process.env.PORT || 1337);

app.use(express.static(__dirname + '/client')); 
app.use(errorHandler());
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


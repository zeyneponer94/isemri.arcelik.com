var express = require('express'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    errorHandler = require('express-error-handler'),
    app = express();

var logFmt = require("logfmt");

app.set('views', __dirname + '/views') ;


app.get('/' , function(req,res) {
    res.sendfile('views/index.html');
} );

app.get('/redirect' , function(req,res) {
    res.render('https://thworkorder.azurewebsites.net/views/redirect.html');
} );



app.set('port', process.env.PORT || 1337);

app.use(express.static(__dirname + '/client')); 
app.use(errorHandler());
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

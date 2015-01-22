// set up ======================================================================
var 
    express = require('express'),
    app = express(),
    port     = process.env.PORT || 3000,
    morgan   = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser');

// configuration ===============================================================

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// routes ======================================================================
var staticMiddleware = express.static(__dirname + '/dist');
app.use(function(req, res, next){
    return staticMiddleware(req,res,next);
});

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// set our port
const port = process.env.PORT || 8080;

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location e.g. /public/img will be /img for users
app.use(express.static(__dirname)); //exposes index.html
// ANY REACT ROUTER ROUTES MUST ALSO BE EXPOSED HERE TO RETURN express.static(__dirname) !!!

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;

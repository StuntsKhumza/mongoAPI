var express = require("express");
var app = express();
var router = require('./router/router.js');
var bodyParser = require("body-parser");
var packagejson = require("./package.json");
var logger = require("morgan");
var favicon = require("serve-favicon");
var path = require("path");
var session = require("express-session");
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var multer = require("multer");
var flash = require("connect-flash");
var mongoose = require("mongoose");
var expressValidator = require('express-validator');
var session_variable;
app.use(bodyParser.json())
app.use(express.static('public'));
var upload = multer({dest:'./uploads'});
//app.use(multer());
app.use(session(
    {
        secret: 'secrete',
        saveUninitialized:true,
        resave: true
    }
));

app.use(passport.initialize());
app.use(passport.session());

//validate
app.use(expressValidator({
    errorFormatter: (param, msg,value)=>{
        var namespace = param.split("."),
        root = namespace.shitf(),
        formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }

        return {
            param : formParam,
            msg: msg,
            value: value
        }
    }
}));

app.use(require('connect-flash')());
app.use(function(req,res,next){
    res.locals.messages = require('express-messages')(req, res);
    next();
})

app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


//app.use('/', express.static(__dirname + '/www')); // redirect root
app.post('/login', router);
app.get('/log', router);
app.post('/addLogin', router);
app.listen(packagejson.port, ()=>{
    console.log('Server up on http://localhost:' + packagejson.port);
})
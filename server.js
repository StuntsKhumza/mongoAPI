var express = require("express");
var app = express();
var router = require('./router/router.js');
var bodyParser = require("body-parser");
var packagejson = require("./package.json");

app.use(bodyParser.json())

app.post('/login', router);
app.get('/log', router);
app.listen(packagejson.port, ()=>{
    console.log('Server up on http://localhost:' + packagejson.port);
})
var express = require("express");
var app = express();
var router = require('./router/router.js');
var bodyParser = require("body-parser");

app.use(bodyParser.json())

app.post('/login', router);
app.get('/log', router);
app.listen(8012, ()=>{
    console.log('Server up on http://localhost:8012');
})
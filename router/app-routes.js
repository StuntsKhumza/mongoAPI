var express = require('express');
var packagejson = require("../package.json");

var routerApp = express.Router();

routerApp.get('/login', (req,res)=>{
    res.render('respond with a resource');
})
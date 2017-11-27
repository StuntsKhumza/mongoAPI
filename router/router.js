var express = require('express');
var packagejson = require("../package.json");
var mongoose = require('mongoose');
var userQuery = require('../mongo/users_query');
var encrypt = require('../utils/bcrypt');
var _ = require('lodash');
var bcrypt = require('bcryptjs');
var session = require("express-session");
var sess = {};// req.session;
var salt = bcrypt.genSaltSync(10);

var routerApp = express.Router();

const url = packagejson.mongoConnectioString;

routerApp.get('/check', (req,res)=>{
    res.send(sess);
})

/*GET USER LOGIN*/
routerApp.post('/login', (req, res) => {

    var userLoginData = {
        ID: req.body.USERNAME
    }   

    userQuery.getLogin(userLoginData)

        .then(data => {

            if (data.length > 0) {
              
                var usrObj = data[0];
                
                var passwordCheck = bcrypt.compareSync(req.body.PASSWORD, usrObj.PASSWORD);
                
                if (passwordCheck) {
                    usrObj.PASSWORD = null;
                    sess.loggedIn = true;
                    sess.userdata = usrObj;
                   
                    res.json({
                        status: 200, userdata: usrObj
                    });
                } else {
                    res.json({
                        status: 403,message:'please check userid/password'
                    });
                }


            } else {

                res.json({ status: 404 , message:'User id (' +req.body.USERNAME + ') does not exist'});

            }
        })

})

/*ADD USER LOGIN*/

routerApp.post('/addLogin', (req, res) => {

    var userData = req.body;

    var hash = bcrypt.hashSync(userData.PASSWORD, 10);

    userData.PASSWORD = hash;

    userQuery.addLogin(userData)

        .then(data => {

            if (!_.isEmpty(data)) {


                res.json({
                    status: 200,
                    message: 'Added successfully'
                });

            } else {

                res.json({ status: 404 });

            }
        })

})

routerApp.get('/getSession', (req,res )=>{

    console.log("Current Session:");
    console.log(sess);
    res.json(sess);

})


module.exports = routerApp;
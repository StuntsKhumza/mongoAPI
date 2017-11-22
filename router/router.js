var express = require('express');
var packagejson = require("../package.json");
var mongoose = require('mongoose');
var userQuery = require('../mongo/users_query');
var encrypt = require('../utils/bcrypt');
var _ = require('lodash');
var bcrypt = require('bcryptjs');
var session = require("express-session");
var sess ;// req.session;
var salt = bcrypt.genSaltSync(10);

var routerApp = express.Router();

const url = packagejson.mongoConnectioString;

/*GET USER LOGIN*/
routerApp.post('/login', (req, res) => {

    var userLoginData = {
        username: req.body.username
    }   

    userQuery.getLogin(userLoginData)

        .then(data => {

            if (data.length > 0) {

                var usrObj = data[0];

                var passwordCheck = bcrypt.compareSync(req.body.password, usrObj.password);

                if (passwordCheck) {
                    usrObj.password = null;
                    sess.loggedIn = true;
                    res.json({
                        status: 200, userdata: usrObj
                    });
                } else {
                    res.json({
                        status: 403
                    });
                }


            } else {

                res.json({ status: 404 });

            }
        })

})

/*ADD USER LOGIN*/

routerApp.post('/addLogin', (req, res) => {

    var userData = req.body;

    var hash = bcrypt.hashSync(userData.password, 10);


    userData.password = hash;

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


module.exports = routerApp;
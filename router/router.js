var express = require('express');
var packagejson = require("../package.json");
var MongoClient = require('mongodb');

var routerApp = express.Router();

const url = packagejson.mongoConnectioString;

routerApp.post('/login', (req, res) => {

    queryMongo_Single(req.body, "users")
        .then(data => {
            if (data.length > 0) {
                res.json(data);

            } else {

                res.json({ status: 404 });

            }
        })

})

routerApp.get('/log', (req, res) => {

    res.send("worked");

})

//query mongo
function queryMongo_Single(query, collectionName) {

    return new Promise((resolve, reject) => {

        MongoClient.connect(url, (err, db) => {

            if (err) {

                reject(err);

            } else {

                db.collection(collectionName).find(query).toArray(function (err, result) {

                    if (err) throw err;

                    db.close();

                    resolve(result);

                });
            }
        });

    })

    return result;

}


module.exports = routerApp;
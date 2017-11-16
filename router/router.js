var express = require('express');

var MongoClient = require('mongodb');

var routerApp = express.Router();

const url = "mongodb://127.0.0.1:27017/loginapp";

routerApp.post('/login', (req, res) => {

    queryMongo_Single(req.body, "users")
        .then(data => {
            if (data.length > 0) {
                res.json(data);
                console.log(data);
            } else {
                console.log(data);
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

var mongoose = require('mongoose');
var users = require('./users');
var encrypt = require('../utils/bcrypt');


module.exports = {

    getLogin: function (data) {
        
        return new Promise((resolve, reject) => {

           users.find(data, (err, user) => {

                if (err) {
                    reject(err);
                } else {

                    resolve(user);
                }

            })

        })

    },

    addLogin: function (data) {

        return new Promise((resolve, reject) => {

            users.create(data, (err,post) => {

                if (err) {

                    reject(err);

                } else {

                    resolve(post);
                }

            })

        })
    }

}

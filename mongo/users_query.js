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
            console.log(data);
            users.create(data, (err, post) => {

                if (err) {

                    reject(err);

                } else {

                    resolve(post);
                }

            })

        })
    },

    updateLogin: function (data) {

        return new Promise((resolve, reject) => {

            //data.ID  = parseInt( data.ID, 10);
            console.log(data);

            var update = {
                $set: data
            }

            users.findByIdAndUpdate(data._id,update, (err, post) => {

                if (err) {

                   reject(err);
 
                } else {

                    resolve(post);
                }

            })

        })
    }

}


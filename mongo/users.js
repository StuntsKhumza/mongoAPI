var mongoose = require("mongoose");
var packagejson = require("../package.json");
var encrypt = require('../utils/bcrypt');

const url = packagejson.mongoConnectioString;

mongoose.connect(url, {useMongoClient: true});

/*GET USER LOGIN*/
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String
})

var users = mongoose.model('users', userSchema);

module.exports = mongoose.model('users', userSchema);




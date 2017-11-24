var mongoose = require("mongoose");
var packagejson = require("../package.json");
var encrypt = require('../utils/bcrypt');

const url = packagejson.mongoConnectioString;

mongoose.connect(url, {useMongoClient: true});

/*GET USER LOGIN*/
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id:Number,
    username: String,
    password: String,
    surname: String,
    type: String,
    speciality: String,
    name: String
})

var users = mongoose.model('users', userSchema);

module.exports = mongoose.model('users', userSchema);




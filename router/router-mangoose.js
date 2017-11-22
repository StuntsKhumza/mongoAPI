var mongoose = require("mongoose");
var packagejson = require("../package.json");

const url = packagejson.mongoConnectioString;

mongoose.connect(url, {useMongoClient: true});

var Schema = mongoose.Schema;

var medsSchema = new Schema({
    name: String,
    description: {type:String, required:true}
})

var meds = mongoose.model('meds', medsSchema);

module.exports = meds;




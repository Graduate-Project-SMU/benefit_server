var mongoose = require('mongoose');
var con = mongoose.connect('mongodb://13.125.61.58:27017/mydb');
module.exports = con;
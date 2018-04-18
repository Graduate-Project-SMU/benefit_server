var mongoose = require('mongoose');
var con = require('./connection');
var Schema = mongoose.Schema;
var storeSchema = new Schema({
    //title : {type : String, required : true},
    company : {
        type : String,
        required : true
    },
    branch : {
        type : String
    },
    location:{
        langitude : {
            type : Number,
            required : true
        },
        longitude :{
            type : Number,
            required : true
        },
    },
    address :{
        type : String,
        required : true
    },
    telephone:{
        type : String,
        required : true
    }


}, {
    collection: 'store'
});

module.exports = mongoose.model('storeData', storeSchema);

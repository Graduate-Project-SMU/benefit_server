var mongoose = require('mongoose');
var con = require('./connection');
var Schema = mongoose.Schema;
var benefitSchema = new Schema({
    category : {
        type : String,
        required: true
    },
    company : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    }

}, {
    collection: 'a_benefit'
});

module.exports = mongoose.model('a_benefitData', benefitSchema);

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
        /*
        *   for example,
        *   content : {
        *       telecom : "SKT",
        *       discount : "1000원당 10퍼 할인"
        *   }
        *
        * */
        content : [Schema.Types.Mixed]



}, {
    collection: 'o_benefit'
});

module.exports = mongoose.model('o_benefitData', benefitSchema);

var mongoose = require('mongoose');
var con = require('./connection');
var Schema = mongoose.Schema;
var storeSchema = new Schema({
        //title : {type : String, required : true},
        company_name:{
            type: String,
            required : true
        },
        o_company: {
            type: Schema.Types.ObjectId,
            ref: 'o_benefitData',
            required: true
        },
        a_company: {
            type: Schema.Types.ObjectId,
            ref: 'a_benefitData',
            required: true
        },
        branch: {
            type: String
        },
        langitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        telephone: {
            type: String,
            required: true
        }
    },
    {
        collection: 'store'
    });

module.exports = mongoose.model('storeData', storeSchema);

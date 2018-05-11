var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var UserData = require('../../config/user_dbconfig');
var a_benefitData = require('../../config/a_benefit_dbconfig');
var o_benefitData = require('../../config/o_benefit_dbconfig')
var storeData = require('../../config/store_dbconfig');
var session = require('express-session');
var async = require('async');
router.post('/', function (req, res, next) {
    console.log(req.session.email);
    let reqLangitude = req.body.langitude;
    let reqLongitude = req.body.longitude;

    let taskArray = [
        (callback) => {
            if (req.session.email) {
                console.log("show Info");
                callback(null);
            } else {
                res.status(500).send({
                    stat: "fail",
                    msgs: "no session"
                });
                callback("no session");

            }
        },
        (callback) => {
            storeData.find({
                langitude: reqLangitude,
                longitude: reqLongitude
            },(err, data)=>{
                if(err){
                    res.status(500).send({
                        stat:"fail",
                        msgs: "find error"
                    });
                    callback("find error" + err);
                }
                else{
                    callback(null, data);
                }
            });
        },
        (data, callback)=>{
            storeData.find({
                langitude: reqLangitude,
                longitude: reqLongitude
            }).populate('o_company').exec(function (err, o_benefit) {
                if (err) {
                    res.status(500).send({
                        stat: "fail",
                        msgs: "no session"
                    });
                    callback("cant find store" + err);
                } else {

                    callback(null, data, o_benefit);
                }
            });
        },
        (data, o_benefit, callback) => {
            storeData.find({
                langitude: reqLangitude,
                longitude: reqLongitude
            }).populate('a_company').exec(function (err, a_benefit) {
                if (err) {
                    res.status(500).send({
                        stat: "fail",
                        msgs: "no session"
                    });
                    callback("cant find store" + err);
                } else {
                    res.status(200).send({
                        stat: "success",
                        msgs: "join and get data success",
                        store_info: data,
                        o_benefit: o_benefit[0].o_company.content,
                        a_benefit: a_benefit[0].a_company.content
                    });
                    callback("join and get data success", null);
                }
            });
        }
    ];
    async.waterfall(taskArray, (err, result) => {
        if (err) console.log(err);
        else console.log(result);
    });


});


module.exports = router;


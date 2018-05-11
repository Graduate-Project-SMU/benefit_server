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
    let company_name = req.body.company_name;
    let a_company_id;
    let o_company_id;
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
            a_benefitData.find({
                company : company_name
            }, (err, a_data) => {
                if(err){
                    res.status(500).send({
                        stat:"fail",
                        msgs: "find error"
                    });
                    callback("find error" + err);
                }
                else{
                    callback(null, a_data);
                }
            });
        },
        (a_data, callback)=>{
            o_benefitData.find({
                company: company_name
            }, (err, o_data) => {
                if(err){
                    res.status(500).send({
                        stat:"fail",
                        msgs: "find error"
                    });
                    callback("find error" + err);
                }
                else{
                    a_company_id = a_data[0]._id;
                    o_company_id = o_data[0]._id;
                    callback(null, a_company_id, o_company_id);
                }
            });
        },
        (a_data, o_data, callback) => {
            let item = {
                company_name : company_name,
                o_company : o_company_id,
                a_company : a_company_id,
                branch : req.body.branch,
                langitude : reqLangitude,
                longitude : reqLongitude,
                address : req.body.address,
                telephone : req.body.telephone
            };
            callback(null, item);
        },
        (item, callback) =>{
            let data = new storeData(item);
            data.save((err) => {
                if (err) {
                    res.status(500).send({
                        stat: "fail",
                        message: "regist store data fail"
                    });
                    callback("regist store data fail" + err, null);
                } else {
                    res.status(201).send({
                        stat: "success",
                        data: {
                            company_name : item.company_name,
                            o_company : item.o_company,
                            a_company : item.a_company,
                            branch : item.branch,
                            langitude : item.langitude,
                            longitude : item.longitude,
                            address : item.address,
                            telephone : item.telephone
                        }
                    });
                    callback("regist store data success", null);
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


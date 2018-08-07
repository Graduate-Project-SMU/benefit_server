var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var crypto = require('crypto');
var UserData = require('../../config/user_dbconfig');
var a_benefitData = require('../../config/a_benefit_dbconfig');
var o_benefitData = require('../../config/o_benefit_dbconfig')
var storeData = require('../../config/store_dbconfig');
let storeSchema = require('../../config/store');
var async = require('async');
let authMiddleware = require('../middleware/auth');

// router.use('/', authMiddleware);
router.get('/:latt/:long', function (req, res, next) {
    let latt = req.params.latt; let long = req.params.long;
    latt = parseFloat(latt); long = parseFloat(long);

    let taskArray = [
        (callback) => {
            storeSchema.find({
                latitude : latt,
                longitude : long
            },(err, data)=>{
                if(err){
                    res.status(500).send({
                        stat:"fail",
                        msgs: "find error"
                    });
                    callback("find error" + err);
                }
                else{
                    if(data) callback(null, data);
                    else callback("Store not exists");
                }
            });
         },
        (data, callback) =>{
            storeSchema.find({
                latitude : latt,
                longitude : long
            }).populate('a_company').exec(function (err, a_benefit) {
                if(err){
                    res.status(500).send({
                        stat : "fail",
                        msgs : "Can't populate with a_company",
                        err : err
                    });
                    callback("Can't populate with a_company");
                }else{
                    callback(null, data, a_benefit);
                }
            });
        },
        (data, a_benefit, callback)=>{


            storeSchema.find({
                latitude : latt,
                longitude : long
            }).populate('o_company').exec(function (err, o_benefit) {
                if(err){
                    res.status(500).send({
                        stat : "fail",
                        msgs : "Can't populate with o_company",
                        err : err
                    });
                    callback("Can't populate with o_company");
                }else{
                    // let a_content = a_benefit[0].a_company.content;
                    // let o_content = o_benefit[0].o_company.content;
                    let a_company = a_benefit[0].a_company;
                    let o_company = o_benefit[0].o_company;



                    let benefitCase = function(a_company, o_company){
                        if(a_company && o_company) return 1;
                        if(!a_company && o_company) return 2;
                        if(a_company && !o_company) return 3;
                    }

                    let benefitCaseNum = benefitCase(a_company, o_company);

                    if(benefitCaseNum == 1){
                        res.status(200).send({
                            stat: "success",
                            msgs: "join and get data success",
                            store_info: {
                                company: data[0].company,
                                branch: data[0].branch,
                                address: data[0].address,
                                telephone: data[0].telephone
                            },
                            o_benefit: o_benefit[0].o_company.content,
                            a_benefit: a_benefit[0].a_company.content
                        });
                        callback("join and get data success", null);
                    }else if(benefitCaseNum == 2){
                        res.status(200).send({
                            stat: "success",
                            msgs: "join and get data success",
                            store_info: {
                                company: data[0].company,
                                branch: data[0].branch,
                                address: data[0].address,
                                telephone: data[0].telephone
                            },
                            o_benefit: o_benefit[0].o_company.content,
                            a_benefit: null
                        });
                        callback("join and get data success", null);
                    }else{
                        res.status(200).send({
                            stat: "success",
                            msgs: "join and get data success",
                            store_info: {
                                company: data[0].company,
                                branch: data[0].branch,
                                address: data[0].address,
                                telephone: data[0].telephone
                            },
                            o_benefit: null,
                            a_benefit: a_benefit[0].a_company.content
                        });
                        callback("join and get data success", null);
                    }
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


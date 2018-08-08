var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
let storeSchema = require('../../config/store');
var a_benefitData = require('../../config/a_benefit_dbconfig');
var o_benefitData = require('../../config/o_benefit_dbconfig');
var async = require('async');
let authMiddleware = require('../middleware/auth');

router.use('/', authMiddleware);
router.get('/:category', function (req, res, next) {
    let category = req.params.category;
    let companys = [];
    let taskArray = [
        (callback) => {
            o_benefitData.find({category: category}, (err, o_benefit_datas) => {
                if (err) {
                    res.status(500).send({
                        stat: "fail",
                        msgs: "can't find a_benefit"
                    });
                }
                else {
                    callback(null, o_benefit_datas);
                }
            });
        },
        (o_benefit_datas, callback) => {
            a_benefitData.find({category: category}, (err, a_benefit_datas) => {
                if (err) {
                    res.status(500).send({
                        stat: "fail",
                        msgs: "can't find a_benefit"
                    });
                }
                else {
                    callback(null, o_benefit_datas, a_benefit_datas);
                }
            });
        },
        (o_benefit_datas, a_benefit_datas, callback) => {
            for (let i = 0; i < o_benefit_datas.length; i++) {
                let companyJson = {
                    company: o_benefit_datas[i].company,
                    o_benefit: o_benefit_datas[i].content,
                    a_benefit: null
                };
                companys.push(companyJson);
            }
            for (let i = 0; i < a_benefit_datas.length; i++) {
                let inCompanys = false;
                let index = null;
                for (let j = 0; j < companys.length; j++) {
                    if (a_benefit_datas[i].company == companys[j].company) {
                        inCompanys = true;
                        index = j;
                    }
                }
                if (inCompanys) {
                    companys[index].a_benefit = a_benefit_datas[i].discount;
                } else {
                    companys.push({
                        company: a_benefit_datas[i].company,
                        o_benefit: null,
                        a_benefit: a_benefit_datas[i].discount
                    });
                }
            }
            callback(null);
        },
        (callback) => {
            res.status(200).send({
                stat: "success",
                msgs: "all of benefits when choose category",
                data: companys
            });
            callback("all of benefits when choose category");
        }

    ];
    async.waterfall(taskArray, (err, result) => {
        if (err) console.log(err);
        else console.log(result);
    });


});


module.exports = router;


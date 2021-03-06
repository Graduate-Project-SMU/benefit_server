var express = require('express');
var router = express.Router();
let async = require('async');
var storeData2 = require('../../config/store_dbconfig2');
let storeSchema = require('../../config/store');
var a_benefitData = require('../../config/a_benefit_dbconfig');
var o_benefitData = require('../../config/o_benefit_dbconfig');

let a_benefit_datas = [];
let o_benefit_datas = [];

router.post('/', function (req, res, next) {
        let taskArray = [
            (callback) => {
                a_benefitData.find({}, (err, data) => {
                    if (err) {
                        res.status(500).send({
                            stat: "fail",
                            msgs: "can't find a_benefit"
                        });
                    }
                    else {
                        for (let i in data) {
                            a_benefit_datas.push(data[i]);
                        }
                        callback(null);
                    }
                });

            },
            (callback) => {

                o_benefitData.find({}, (err, data) => {
                    if (err) {
                        res.status(500).send({
                            stat: "fail",
                            msgs: "can't find o_benefit"
                        });
                    }
                    else {
                        for (let i in data) {
                            o_benefit_datas.push(data[i]);
                        }
                        callback(null);
                    }
                });
            },
            (callback) => {
                storeData2.find({}, function (err, datas) {
                    if (err) {
                        res.status(500).send({
                            stat: "fail",
                            msgs: "find error"
                        });
                        callback(err);
                    } else {
                        callback(null, datas);
                    }
                });
            },
            (datas, callback) => {
                function doSave(item){
                    let insertData = new storeSchema(item);
                    insertData.save((err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
                function aIdAndoIdfind(count) {
                    let a_data = null;
                    let o_data = null;
                    let category = null;
                    for (let i = 0; i < a_benefit_datas.length; i++) {
                        if (datas[count].company == a_benefit_datas[i].company) {
                            a_data = a_benefit_datas[i]._id;
                            category = a_benefit_datas[i].category;
                        }
                    }
                    for (let i = 0; i < o_benefit_datas.length; i++) {
                        if (datas[count].company == o_benefit_datas[i].company) {
                            o_data = o_benefit_datas[i]._id;
                            category = o_benefit_datas[i].category;
                        }
                    }
                    let long = (datas[count].location).coordinates[0];
                    let lat = (datas[count].location).coordinates[1];
                    let item = {
                        company: datas[count].company,
                        branch: datas[count].branch,
                        address: datas[count].address,
                        telephone: datas[count].telephone,
                        a_company: null,
                        o_company: null,
                        category: category,
                        location: {
                            type: "Point",
                            coordinates: [long, lat]
                        },
                        latitude: lat,
                        longitude: long
                    };
                    if (a_data && !o_data) {
                        item.a_company = a_data;
                        doSave(item);
                    }
                    if (!a_data && o_data) {
                        item.o_company = o_data;
                        doSave(item);
                    }
                    if (a_data && o_data) {
                        item.a_company = a_data;
                        item.o_company = o_data;
                        doSave(item);
                    }
                }

                for (let i = 0; i < datas.length; i++) {
                    aIdAndoIdfind(i);
                }
                callback(null);

            },
            (callback) => {
                res.status(201).send({
                    stat: "success"
                })
                callback("insert finish", null);
            }

        ];
        async.waterfall(taskArray, (err, result) => {
            if (err) console.log(err);
            else console.log(result);
        });

    }
);


module.exports = router;

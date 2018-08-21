var express = require('express');
var router = express.Router();
let async = require('async');
let storeSchema = require('../../config/store');
var a_benefitData = require('../../config/a_benefit_dbconfig');
var o_benefitData = require('../../config/o_benefit_dbconfig');


let a_datas = [];
let o_datas = [];


router.post('/', function (req, res, next) {
    const taskArray = [
        callback=>{
            a_benefitData.find({},(err, data)=>{
                if(err){
                    res.status(500).send({
                        stat:"fail",
                        msgs: "find error"
                    });
                    callback("find error" + err);
                }
                else{
                    if(data) {
                        for (let i =0; i<data.length; i++){
                            a_datas.push({
                                company : data[i].company,
                                img : data[i].img
                            });
                        }
                        callback(null);
                    }
                    else callback("Store not exists");
                }
            });
        },
        callback=>{
            o_benefitData.find({},(err, data)=>{
                if(err){
                    res.status(500).send({
                        stat:"fail",
                        msgs: "find error"
                    });
                    callback("find error" + err);
                }
                else{
                    if(data) {
                        for (let i =0; i<data.length; i++){
                            o_datas.push({
                                company : data[i].company,
                                img : data[i].img
                            });
                        }
                        callback(null);
                    }
                    else callback("Store not exists");
                }
            });
        },
        callback=>{
            function updateStores(datas, count){
                storeSchema.updateMany({ company : datas[count].company}, {"$set" : {"img" : datas[count].img}}, function(){
                    console.log("Updating");
                });
            }
            for (let i =0; i<a_datas.length; i++){
                updateStores(a_datas, i);
            }
            for (let i =0; i<o_datas.length; i++){
                updateStores(o_datas, i);
            }
            callback(null);
        },
        callback=>{
            res.status(201).send({
                stat : "success"
            });
            callback("Fin");
        }
    ];

    async.waterfall(taskArray, (err, result)=>{
        if(err) console.log(err);
        else console.log(result);
    });
});



module.exports = router;

var express = require('express');
var router = express.Router();
var async = require('async');
let boardSchema = require('../../config/board')
let authMiddleware = require('../middleware/auth');

router.use('/', authMiddleware);
router.post('/', function (req, res, next) {
    let title = req.body.text; let content = req.body.text;
    let titleArray = [];
    let contentArray = [];
    let taskArray = [
        (callback) => {
            //역순으로 보여준다.
            boardSchema.find({ title : { "$in" : [title]}}).sort('-writetime').exec((err, data) => {
                if (err) {
                    res.status(500).send({
                        stat: "fail",
                        msgs: "find error"
                    });
                    callback("find error" + err);
                }
                else {
                    if(data){
                        for(let i in data){
                            titleArray.push(data[i]);
                        }
                    }
                    callback(null);
                }
            });
        },
        (callback) => {
            //역순으로 보여준다.
            boardSchema.find({ content : { "$in" : [content]}}).sort('-writetime').exec((err, data) => {
                if (err) {
                    res.status(500).send({
                        stat: "fail",
                        msgs: "find error"
                    });
                    callback("find error" + err);
                }
                else {
                    if(data){
                        for(let i in data){
                            contentArray.push(data[i]);
                        }
                    }
                    callback(null);
                }
            });
        },
        (callback) => {
            let data = [];
            for(let i in titleArray){
                data.push(titleArray[i]);
            }
            for(let i in contentArray){
                let inArray = false;
                for(let j in titleArray){
                    if(contentArray[i].writetime == titleArray[j].writetime) inArray = true;
                }
                if(!inArray) data.push(contentArray[i]);
            }
            data.sort(function(x, y){
                return (x.writetime - y.writetime <= 0);
            });
            if (data) {
                res.status(200).send({
                    stat: "success",
                    data: data
                });
                callback("find boards success", null);
            } else {
                res.status(500).send({
                    stat: "fail",
                    msgs: "can't find boards"
                });
                callback("can't find boards");
            }

        }
    ];
    async.waterfall(taskArray, (err, result) => {
        if (err) console.log(err);
        else console.log(result);
    });

});

module.exports = router;

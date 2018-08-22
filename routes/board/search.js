var express = require('express');
var router = express.Router();
var async = require('async');
let boardSchema = require('../../config/board')
let authMiddleware = require('../middleware/auth');

router.use('/', authMiddleware);
router.post('/', function (req, res, next) {
    let text = '.*' + req.body.text + '.*';
    let titleArray = [];
    let contentArray = [];
    console.log(req.body.text);
    console.log(text);
    let taskArray = [
        (callback) => {
            //포함된 문자열을 보여준다.
            boardSchema.find({ title : {$regex : text}}).sort('-writetime').exec((err, data) => {
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
            //포함된 문자열을 보여준다.
            boardSchema.find({ content : {$regex : text}}).sort('-writetime').exec((err, data) => {
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
                // console.log(titleArray[i]);
                data.push(titleArray[i]);
            }
            for(let i in contentArray){
                let inArray = false;
                for(let j in titleArray){
                    // object to string을 통하여 string 비교!
                    if((contentArray[i]._id+"") == (titleArray[j]._id+"")){
                        inArray = true;
                    }
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

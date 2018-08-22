var express = require('express');
var router = express.Router();
var async = require('async');
let boardSchema = require('../../config/board')
let authMiddleware = require('../middleware/auth');


router.use('/', authMiddleware);
router.get('/', function (req, res, next) {
    let taskArray = [
        (callback) => {
            //역순으로 보여준다.
            boardSchema.find({}).sort('-writetime').exec((err, data) => {
                if (err) {
                    res.status(500).send({
                        stat: "fail",
                        msgs: "find error"
                    });
                    callback("find error" + err);
                }
                else {
                    callback(null, data);
                }
            });
        },
        (data, callback) => {
            let nickname = req.decoded.nickname;
            let temp = [];
            let doSetFlag = num => {
                if(data[num].author == nickname){
                    temp.push({
                        _id : data[num]._id,
                        author: data[num].author,
                        title: data[num].title,
                        content: data[num].content,
                        writetime: data[num].writetime,
                        flag : 1,
                        __v: 0

                    });
                }
                else{
                    temp.push({
                        _id : data[num]._id,
                        author: data[num].author,
                        title: data[num].title,
                        content: data[num].content,
                        writetime: data[num].writetime,
                        flag : 0,
                        __v: 0
                    });
                }
            }
            for (let i in data) {
                doSetFlag(i);
            }
            console.log(data[0].isU);
            if (data) {
                res.status(200).send({
                    stat: "success",
                    data: temp
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

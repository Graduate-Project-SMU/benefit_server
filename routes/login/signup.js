var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var async = require('async');
// var mongoose = require('mongoose');
// var con = mongoose.connect('mongodb://13.125.61.58:27017/mydb');
// var Schema = mongoose.Schema;
var UserData = require('../../config/dbconfig');


router.post('/', function (req, res, next) {
    let taskArray = [
        (callback) => {
            let salt = crypto.randomBytes(32).toString('base64');
            crypto.pbkdf2(req.body.password, salt, 100000, 64, 'sha512', (err, hashed) => {
                if (err) {
                    res.status(500).send({
                        stat: "fail",
                        msgs: "hashing fail"
                    });
                    callback("hashing fail" + err);
                } else {
                    callback(null, hashed, salt);
                }
            });
        },
        (hashed, salt, callback) => {
            var item = {
                name: req.body.name,
                email: req.body.email,
                nickname: req.body.nickname,
                password: hashed.toString('base64'),
                posi: req.body.posi,
                mKind: req.body.mKind,
                mServiceStartDate: req.body.mServiceStartDate,
                gender: req.body.gender,
                salt: salt
            };
            callback(null, item);
        },
        (item, callback) => {
            var data = new UserData(item);
            data.save((err) => {
                if (err) {
                    res.status(500).send({
                        stat: "fail",
                        message: "sign up fail"
                    });
                    callback("sign up fail" + err, null);
                } else {
                    res.status(201).send({
                        stat: "success",
                        data: {
                            name: req.body.name,
                            email: req.body.email,
                            nickname: req.body.nickname,
                            posi: req.body.posi,
                            mKind: req.body.mKind,
                            mServiceStartDate: req.body.mServiceStartDate,
                            gender: req.body.gender
                        }
                    });
                    callback("sign up success", null);
                }
            });
        }
    ];
    async.waterfall(taskArray, (err, result)=>{
        if(err) console.log(err);
        else console.log(result);
    });

});

module.exports = router;

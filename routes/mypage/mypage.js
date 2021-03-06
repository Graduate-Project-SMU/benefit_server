var express = require('express');
var router = express.Router();
var UserData = require('../../config/user_dbconfig');
let authMiddleware = require('../middleware/auth');

router.use('/', authMiddleware);
router.get('/', function (req, res, next) {
    UserData.find({
        email: req.decoded.email
    }, function (err, data) {
        if (err) {
            res.status(500).send({
                stat: "fail",
                msgs: "find error"
            });
        }
        else {
            if (data[0]) {
                res.status(200).send({
                    stat: "success",
                    data: {
                        email: data[0].email,
                        name: data[0].name,
                        nickname: data[0].nickname,
                        posi: data[0].posi,
                        mkind: data[0].mkind,
                        mServiceStartDate: data[0].mServiceStartDate,
                        gender: data[0].gender
                    }
                });
            } else {
                res.status(500).send({
                    stat: "fail",
                    msgs: "no such info"
                });
            }
        }
    });


});


module.exports = router;

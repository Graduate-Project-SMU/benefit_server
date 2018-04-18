var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var UserData = require('../../config/user_dbconfig');
var a_benefitData = require('../../config/a_benefit_dbconfig');
var session = require('express-session');
router.post('/', function (req, res, next) {
    console.log(req.session.email);
    if (req.session.email) {
        console.log("show Info");
    } else {
        res.status(500).send({
            stat: "fail",
            msgs: "no session"
        });

    }

});


module.exports = router;


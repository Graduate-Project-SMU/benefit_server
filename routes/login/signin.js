var express = require('express');
var router = express.Router();
var UserData = require('../../config/dbconfig');
var session = require('express-session');
router.post('/', function(req, res, next) {
  UserData.find({
    email: req.body.email,
    password: req.body.password
  }, function(err, data) {
    if (err) {
      res.status(500).send({
        stat: "fail",
      });
      console.log("find error");
    } else {
      if (data[0]) {
        let email = data[0].email;
        req.session.email = email;
        console.log(req.session.email);
        req.session.save();
        res.status(201).send({
          stat: "success",
          message: "login success"
        });
      }else{
        res.status(500).send({
          stat: "fail",
          message: "login fail"
        });
      }
    }
  });
});


module.exports = router;

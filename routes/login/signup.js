var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');
// var con = mongoose.connect('mongodb://13.125.61.58:27017/mydb');
// var Schema = mongoose.Schema;
var UserData = require('../../config/dbconfig');


router.post('/', function(req, res, next) {
  var item = {
    name: req.body.name,
    email: req.body.email,
    nickname: req.body.nickname,
    password: req.body.password,
    posi: req.body.posi,
    mKind: req.body.mKind,
    mServiceStartDate: req.body.mServiceStartDate,
    gender: req.body.gender
  };
  var data = new UserData(item);
  data.save((err) => {
    if (err) {
      res.status(500).send({
        stat:"fail",
        message:"sign up fail"
      });
    } else {
      res.status(201).send({
        stat: "success",
        data: {
          name: req.body.name,
          email: req.body.email,
          nickname: req.body.nickname,
          password: req.body.password,
          posi: req.body.posi,
          mKind: req.body.mKind,
          mServiceStartDate: req.body.mServiceStartDate,
          gender: req.body.gender
        }
      });
    }
  });
});

module.exports = router;

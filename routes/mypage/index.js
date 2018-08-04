var express = require('express');
var router = express.Router();
var mypage = require('./mypage');

router.use('/', mypage);

module.exports = router;

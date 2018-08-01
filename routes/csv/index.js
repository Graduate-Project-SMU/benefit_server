var express = require('express');
var router = express.Router();
var store = require('./store');


router.use('/store', store);




module.exports = router;

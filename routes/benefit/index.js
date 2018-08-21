var express = require('express');
var router = express.Router();
var store = require('./store');
var category = require('./category');
var a_benefitData = require('../../config/a_benefit_dbconfig');
var o_benefitData = require('../../config/o_benefit_dbconfig')

router.use('/store', store);
router.use('/category', category);



module.exports = router;


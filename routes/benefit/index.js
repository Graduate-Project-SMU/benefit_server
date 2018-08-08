var express = require('express');
var router = express.Router();
var store = require('./store');
var category = require('./category');


router.use('/store', store);
router.use('/category', category);



module.exports = router;


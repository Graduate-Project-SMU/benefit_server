var express = require('express');
var router = express.Router();
var showInfo = require('./showInfo');



router.use('/', showInfo);



module.exports = router;


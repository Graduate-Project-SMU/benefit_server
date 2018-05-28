var express = require('express');
var router = express.Router();
var showInfo = require('./showInfo');
var makestoredata = require('./makestoredata');


router.use('/showInfo', showInfo);
router.use('/makestoredata', makestoredata);


module.exports = router;


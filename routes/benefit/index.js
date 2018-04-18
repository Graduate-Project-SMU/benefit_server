var express = require('express');
var router = express.Router();
var showInfo = require('./showInfo');

router.use('/showInfo', showInfo);



module.exports = router;


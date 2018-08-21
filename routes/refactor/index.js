var express = require('express');
var router = express.Router();
var map = require('./map');

router.use("/map", map);

module.exports = router;

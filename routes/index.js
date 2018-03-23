//localhost:3000/hello/world

var express = require('express');
var router = express.Router();
var login = require('./login/index');
var hello = require('./hello/index');
router.use('/login', login);
router.use('/hello', hello);


module.exports = router;

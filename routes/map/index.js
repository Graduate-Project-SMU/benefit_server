let express = require('express');
let router = express.Router();
let map = require('./map');

router.use('/', map);

module.exports = router;

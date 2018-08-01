let express = require('express');
let router = express.Router();
let map = require('./map');

router.use('/map', map);

module.exports = router;

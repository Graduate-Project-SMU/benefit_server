let express = require('express');
let router = express.Router();
let show = require('./show');

router.use('/', show);

module.exports = router;

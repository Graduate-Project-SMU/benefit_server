let express = require('express');
let router = express.Router();
let dflt = require('./default');

router.use('/', dflt);

module.exports = router;

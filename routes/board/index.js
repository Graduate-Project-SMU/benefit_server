let express = require('express');
let router = express.Router();
let create = require('./create');
let remove = require('./remove');
let edit = require('./edit');
let show = require('./show');


router.use('/', create);
router.use('/', remove);
router.use('/', edit);
router.use('/', show);




module.exports = router;
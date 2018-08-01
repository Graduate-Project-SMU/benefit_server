var express = require('express');
var router = express.Router();
var login = require('./login/index');
var mypage = require('./mypage/index');
var benefit = require('./benefit/index');
let map = require('./map/index');
let csv = require('./csv/index');



router.use('/login', login);
router.use('/mypage', mypage);
router.use('/benefit', benefit);
router.use('/map', map);
router.use('/csv', csv);



module.exports = router;

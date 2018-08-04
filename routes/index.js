var express = require('express');
var router = express.Router();
var auth = require('./auth/index');
var mypage = require('./mypage/index');
var benefit = require('./benefit/index');
let map = require('./map/index');
let csv = require('./csv/index');



router.use('/auth', auth);
router.use('/mypage', mypage);
router.use('/benefit', benefit);
router.use('/map', map);
router.use('/csv', csv);



module.exports = router;

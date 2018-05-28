var express = require('express');
var router = express.Router();
var login = require('./login/index');
var mypage = require('./mypage/index');
var benefit = require('./benefit/index');


router.use('/login', login);
router.use('/mypage', mypage);
router.use('/benefit', benefit);


module.exports = router;

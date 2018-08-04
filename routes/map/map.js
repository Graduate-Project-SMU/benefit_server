var express = require('express');
var router = express.Router();
let storeData = require('../../config/store_dbconfig');
let storeSchema = require('../../config/store');
let authMiddleware = require('../middleware/auth');



// router.use('/', authMiddleware);
router.post('/:latt/:long', function (req, res, next) {
    let long = req.params.long;
    let latt = req.params.latt;
    storeSchema.find({
        location : {
            $near : {
                $maxDistance : 1000,
                $geometry : {
                    type: "Point",
                    coordinates: [long, latt]
                }
            }
        }
    }).find((error, results) => {
        if (error) {

        }else{

        }
        // console.log(results);
    });
});



module.exports = router;

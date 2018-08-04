var express = require('express');
var router = express.Router();
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
            res.status(500).send({
                stat : "fail",
                msgs : "Can't find store data"
            });
        }else{
            res.status(200).send({
                stat : "success",
                data : results
            });
        }
        // console.log(results);
    });
});



module.exports = router;

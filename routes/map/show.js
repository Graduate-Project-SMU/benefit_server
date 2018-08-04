var express = require('express');
var router = express.Router();
let async = require('async');
let storeSchema = require('../../config/store');
let authMiddleware = require('../middleware/auth');



// router.use('/', authMiddleware);
router.post('/:latt/:long/:category?', function (req, res, next) {
    const category = req.params.category;
    const long = req.params.long;
    const latt = req.params.latt;
    let maxDistance = req.query.distance;
    if(maxDistance == null || maxDistance == '') maxDistance = 1000;
    const taskArray = [
        callback => {
            storeSchema.find({
                location : {
                    $near : {
                        $maxDistance : maxDistance,
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
                    callback("error : " + error);
                }else{
                    if(!category || category == ''){
                        res.status(200).send({
                            stat : "success",
                            data : results
                        });
                        callback("find nearby stores success");
                    }else{
                        callback(null, results);
                    }
                }

            });
        },
        (results, callback) => {
            let finalResults = [];
            for(let i = 0; i< results.length; i++){
                if(results[i].category == category) finalResults.push(results[i]);
            }
            if(finalResults.length != 0){
                res.status(200).send({
                    stat : "success",
                    data : finalResults
                });
                callback("find nearby stores with category success");
            }else{
                res.status(500).send({
                    stat : "fail",
                    msgs : "Can't find store data with category"
                });
                callback("Can't find store data with category");
            }
        }
    ];

    async.waterfall(taskArray, (err, result)=>{
        if(err) console.log(err);
        else console.log(result);
    });
});



module.exports = router;

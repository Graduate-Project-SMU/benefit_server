var express = require('express');
var router = express.Router();
var async = require('async');
let boardSchema = require('../../config/board')
let authMiddleware = require('../middleware/auth');

router.use('/', authMiddleware);
router.delete('/:_id', function (req, res, next) {
    let taskArray = [
        (callback) => {
            boardSchema.findOneAndRemove({_id:req.params._id}, (err) =>{
                if(err){
                    res.status(500).send({
                        stat:"fail",
                        msgs: "can't remove board"
                    });
                    callback("can't remove board" + err);
                }
                else{
                    res.status(201).send({
                        stat:"success",
                        msgs:"success remove board",
                        data: {
                            _id: req.params._id
                        }
                    });
                    callback("success remove board", null);
                }
            });
        }
    ];
    async.waterfall(taskArray, (err, result)=>{
        if(err) console.log(err);
        else console.log(result);
    });

});

module.exports = router;

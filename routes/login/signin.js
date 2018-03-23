var express = require('express');
var router = express.Router();
var Client = require('mongodb').MongoClient;

router.post('/', (req, res) => {
  Client.connect('mongodb://13.125.61.58:27017/mydb', function(error, db) {
    if (error) {
      res.status(500).send({
        stat: "fail",
        message : "error"
      });
      conole.log(error);
    } else {
      var info = {
        name: 'Dalsu',
        age: 26,
        gender: 'M'
      };
      var dbo = db.db("mydb");
      dbo.collection('student').insert(info);
      res.status(201).send({
        name : info.name,
        age : info.age,
        gender : info.gender
      });
      console.log("connected" + db);

      db.close();

    }
  });
});



module.exports = router;

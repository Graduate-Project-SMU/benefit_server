var express = require('express');
var router = express.Router();
var login = require('./login/index');
var mypage = require('./mypage/index');
// var mongoose = require('mongoose');
// var con = mongoose.connect('mongodb://13.125.61.58:27017/mydb');
// var Schema = mongoose.Schema;

router.use('/login', login);
router.use('/mypage', mypage);



// var userDataSchema = new Schema({
//   //title : {type : String, required : true},
//   name: {type: String, required:true},
//   email: {type:String, required:true,unique:true},
//   nickname: {type:String,required:true,unique:true},
//   password: {type:String,required:true},
//   posi: {type:String, required:true},  //근무 형태 ex)일반인, 군인, 곰신 ..
//   mKind : {type:String, required:false}, //military kind
//   mServiceStartDate:{type:Date, required:false},
//   gender:{type:String, required:true}
// }, {
//   collection: 'user-data'
// });
//
// var UserData = mongoose.model('UserData', userDataSchema);



// router.get('/', function(req, res, next) {
//   res.render('index');
// });
//
// router.post('/get-data', function(req, res, next) {
//   UserData.find({}, function(err, data) {
//     if (err) {
//       res.status(500).send({
//         stat : "fail",
//       });
//       console.log("find error");
//     } else {
//       res.status(201).send({
//         stat : "success",
//         allData : {
//           eachData : data
//         }
//       });
//     }
//   });
// });
//
// router.post('/update', function(req, res, next) {
//   var item = {
//     name: req.body.name,
//     email: req.body.email,
//     nickname: req.body.nickname,
//     password: req.body.password,
//     posi: req.body.posi,
//     mKind:req.body.mKind,
//     mServiceStartDate: req.body.mServiceStartDate,
//     gender:req.body.gender
//   };
//   UserData.findOne({email: item.email}, function(err,doc){
//     if(err){
//       res.status(500).send({
//         stat: "fail"
//       });
//       console.log('error, no entry found');
//     }else{
//       doc.name = item.name;
//       doc.nickname = item.nickname;
//       doc.password = item.password;
//       doc.posi = item.posi;
//       doc.mServiceStartDate = item.mServiceStartDate;
//       doc.mKind = item.mKind;
//       doc.gender = item.gender;
//       doc.save();
//       res.status(201).send({
//         stat: "success",
//         data : {
//           name: req.body.name,
//           email: req.body.email,
//           nickname: req.body.nickname,
//           password: req.body.password,
//           posi: req.body.posi,
//           mKind:req.body.mKind,
//           mServiceStartDate: req.body.mServiceStartDate,
//           gender:req.body.gender
//         }
//       });
//     }
//   });
// });
//
// router.post('/insert', function(req, res, next) {
//   var item = {
//     name: req.body.name,
//     email: req.body.email,
//     nickname: req.body.nickname,
//     password: req.body.password,
//     posi: req.body.posi,
//     mKind:req.body.mKind,
//     mServiceStartDate: req.body.mServiceStartDate,
//     gender:req.body.gender
//   };
//   var data = new UserData(item);
//   data.save();
//
// });
//
//
//
//
// router.post('/delete', function(req, res, next) {
//   //var id = req.body.id;
//   //UserData.findByIdAndRemove(id).exec();
//   UserData.findOneAndRemove({email : req.body.email}).exec();
//   res.redirect('/');
// });



module.exports = router;

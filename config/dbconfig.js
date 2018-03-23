var mongoose = require('mongoose');
var con = mongoose.connect('mongodb://13.125.61.58:27017/mydb');
var Schema = mongoose.Schema;
var userDataSchema = new Schema({
  //title : {type : String, required : true},
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  nickname: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  posi: {
    type: String,
    required: true
  }, //근무 형태 ex)일반인, 군인, 곰신 ..
  mKind: {
    type: String,
    required: false
  }, //military kind
  mServiceStartDate: {
    type: Date,
    required: false
  },
  gender: {
    type: String,
    required: true
  }
}, {
  collection: 'user-data'
});

module.exports = mongoose.model('UserData', userDataSchema);

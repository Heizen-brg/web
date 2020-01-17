const mongoose = require ('../config/mongoDB')
const bcrypt = require('bcryptjs')
var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email:String,
  gender:String,
  address: String,
});


const User = mongoose.model('User',userSchema);


module.exports = User
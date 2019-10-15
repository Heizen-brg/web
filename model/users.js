const mongoose = require('../database/mongoDB');
const Schema = mongoose.Schema;
 
const user = new Schema({
    username : String,
    password : String,
    type:Number
})

var User = mongoose.model('users',user );

module.exports = User
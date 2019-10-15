const User = require('../model/users');

module.exports = User.findOne({
    username : 'alx',
    password: '1',
    type: 1
}).exec(function (err,data) {    
    // console.log(data.username);
    
})



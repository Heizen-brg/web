var express = require('express');
var router = express.Router();
const User = require('../model/user')
var bodyParser = require('body-parser')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


//handle get list users
let getAllUser = (req, res, next) => {
 
  
  User.find(function (err, users) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }


    req.data = users
    next()
  })
};
//handle create new user
let createUser = (req, res, next) => {
  let user = new User();
  user.username = req.body.username ? req.body.username : user.username;
  user.gender = req.body.gender;
  user.email = req.body.email;

  //save user
  user.save(function (err) {
    if (err)
      res.json(err)
  })
  res.json({
    message: "New user created!",
    data: user
  })
}
//handle view user infomation
let getUser = (req, res, next) => {
  User.findById(req.params.id, function (err, user) {
    if (err)
      res.send(err);
    res.json({
      message: 'User details loading...',
      data: user
    })
    // console.log("=========================",user);

  })
  // User.findById(req.params.id).then(function(value) {
  //     console.log('aaaaaaaaaaa')
  // })
}


//handle update user info
let updateUser = (req, res, next) => {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      res.send(err)
      return;
    }


    if (user) {
      user.username = req.body.username;
      user.gender = req.body.gender;
      user.email = req.body.email;
      //save it
      user.save(function (err) {
        if (err)
          res.json(err)
        res.json({
          message: "Update info successfully!",
          data: user
        })
      })
    } else {
      res.status(500).json({
        message: 'Id invalid'
      })
    }

  })
}

//handle delete contact
let deleteUser = (req, res, next) => {
  User.remove({
    _id: req.params.id
  },
    function (err, user) {
      if (err)
        res.json(err)
      res.json({
        message: "Delete user succesfully!",
        data: user
      })
    }
  )
}
module.exports = {
  createUser, getAllUser, getUser, updateUser, deleteUser
}
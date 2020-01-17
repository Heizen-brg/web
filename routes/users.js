var express = require('express');
var router = express.Router();
const userService = require('../serviceRouter/CRUD.js')


/* GET users listing. */
router.get('/', userService.getAllUser, function (req, res, next) {

  // console.log(req.data)
  res.render('users', { data: req.data })
})


//create user
router.post('/', userService.createUser)
//get 1 user
router.get('/:id', userService.getUser)

//update 1 user
router.put('/:id', userService.updateUser)
//delete 1 user
router.delete('/:id', userService.deleteUser)
module.exports = router;

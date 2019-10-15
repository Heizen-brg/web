const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const service = require('../service/service')


//config body-parser
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))


    // =====================================
    // Trang chủ (có các url login) ========
    // =====================================
    router.get('/login', function(req, res) {
        res.render('login.ejs');
    })

    router.post('/login',function (req,res) {
        //service find
     
        if (service.username) {
        var token =  jwt.sign({ data: req.body.username && req.body.password && req.body.type}, '1234', { expiresIn:24 * 60 * 60 });
        }
        
    })


 


module.exports = router ;
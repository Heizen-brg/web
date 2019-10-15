const express = require('express')
const app = express()
const mongoose = require('mongoose');
const path = require('path');
const database = require('./database/mongoDB')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const port = 3000

//router
var indexRouter = require('./routes/routes');
app.use('/', indexRouter)


app.set('view engine', 'ejs'); // chỉ định view engine là ejs


//error middleware
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(port, () => console.log(`Done`))
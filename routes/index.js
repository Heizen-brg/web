var express = require('express');
var router = express.Router();
var User = require('../model/user')
var passport = require('passport')
var jwt = require('jsonwebtoken')


/* GET home page. */
router.get('/login', (req, res) => res.render('login'))

// Register User
router.post('/register', function (req, res) {
  var password = req.body.password;
  var password2 = req.body.password2;

  if (password == password2) {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    User.createUser(newUser, function (err, user) {
      if (err) throw err;
      res.send(user).end()
    });
  } else {
    res.status(500).send("{errors: \"Passwords don't match\"}").end()
  }
});
// Using LocalStrategy with passport

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});
// Endpoint to login
router.post('/login', function (req, res, next) {

  passport.authenticate('local', {session: false}, (err, user, info) => {
      // console.log(err);
      if (err || !user) {
          return res.status(400).json({
              message: info ? info.message : 'Login failed',
              user   : user
          });
      }

      req.login(user, {session: false}, (err) => {
          if (err) {
              res.send(err);
          }

          const token = jwt.sign(user.toJSON() ,'secret');

          return res.json({user, token});
      });
  })
  (req, res);

});

// Endpoint to get current user
router.get('/user', function (req, res) {
  res.send(req.user);
})


// Endpoint to logout
router.get('/logout', function (req, res) {
  req.logout();
  res.send(null)
});

var FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
  clientID: "261750001377647",
  clientSecret: "d8a3541ebfbac696873e7736182f0311",
  callbackURL: "http://localhost:3000/auth/facebook/callback"
},
  function (accessToken, refreshToken, profile, done) {
    console.log(profile)
    User.findOne({ 'facebook.id': profile.id }, function (err, user) {
      if (err) return done(err);
      if (user) return done(null, user);
      else {
        // if there is no user found with that facebook id, create them
        var newUser = new User();

        // set all of the facebook information in our user model
        newUser.facebook.id = profile.id;
        newUser.facebook.token = accessToken;
        newUser.facebook.name = profile.displayName;
        if (typeof profile.emails != 'undefined' && profile.emails.length > 0)
          newUser.facebook.email = profile.emails[0].value;

        // save our user to the database
        newUser.save(function (err) {
          if (err) throw err;
          return done(null, newUser);
        });
      }
    });
  }
));
router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    // console.log(req.user)
    res.redirect('/users');
  }
);



module.exports = router;

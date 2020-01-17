const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('../model/user')


passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
},
  function (username, password, done) {
    User.getUserByName(username, function (err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: 'Unknown User' });
      }
// console.log(user.password);

      User.comparePassword(password, user.password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Invalid password' });
        }
      });
    });
  }
)
)
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : 'secret'
},
function (jwtPayload, cb) {

  //find the user in db if needed
  return User.findById(jwtPayload.id)
      .then(user => {
          return cb(null, user);
      })
      .catch(err => {
          return cb(err);
      });
}
));

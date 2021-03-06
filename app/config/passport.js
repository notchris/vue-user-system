var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, email, password, done) {
    process.nextTick(function() {
      User.findOne({$or: [{'username': req.body.username}, {'email': email}]}, function(err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
          if (email == user.email){
            return done(null, false, req.flash('signupMessage', 'That email is already registered.'));
          }
          if (req.body.username == user.username){
            return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
          }
          
        } else {
          var newUser = new User();
          newUser.username = req.body.username;
          newUser.email = email;
          newUser.password = newUser.generateHash(password);
          newUser.save(function(err) {
            if (err) return done(err);
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, email, password, done) {
    User.findOne({ 'email':  email }, function(err, user) {
      if (err)
          return done(err);
      if (!user)
          return done(null, false, req.flash('loginMessage', 'No user found.'));
      if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      return done(null, user);
    });
  }));


};

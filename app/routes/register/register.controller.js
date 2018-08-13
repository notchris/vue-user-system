var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
module.exports = (router) => {
    router.get("/register",
        (req, res, next) => {
		  if (!req.isAuthenticated()){
            req.vueOptions.head.title = "Register";
            res.renderVue("register/register.vue", {message: req.flash('signupMessage')}, req.vueOptions);
		  } else {
		    res.redirect('/');
		  }
        },
    );
	router.post('/register', passport.authenticate('local-signup', {
	  successRedirect: '/',
	  failureRedirect: '/register',
	  failureFlash: true,
	}));
};
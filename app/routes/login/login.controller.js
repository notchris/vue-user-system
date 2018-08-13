var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
module.exports = (router) => {
    router.get("/login",
        (req, res, next) => {
		  if (!req.isAuthenticated()){
            req.vueOptions.head.title = "Login";
            res.renderVue("login/login.vue", {message: req.flash('loginMessage')}, req.vueOptions);
		  } else {
		    res.redirect('/admin');
		  }
        },
    );
	router.post('/login', passport.authenticate('local-login', {
	  successRedirect: '/admin',
	  failureRedirect: '/login',
	  failureFlash: true,
	}));
};
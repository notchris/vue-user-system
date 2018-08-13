var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');
module.exports = (router) => {
    router.get("/user/:name", isLoggedIn,
        (req, res) => {
		  User.findOne({'username': req.params.name }, function(err, result) {
		    if (err){
		        console.log(err)
		    	res.redirect('/')
		    }
		    if (result) {
	            req.vueOptions.head.title = "Site Title";
	            res.renderVue("profile/profile.vue", {user: req.user, profile: result }, req.vueOptions);
		    } else {
		      console.log('No user found')
		      res.redirect('/')
		    }
		  });
        },
    );
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/');
  }
}
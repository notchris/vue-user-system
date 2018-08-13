var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');
var Post = require('../../models/post');
module.exports = (router) => {
    router.get("/admin",
        (req, res) => {
            res.redirect('/admin/dashboard')
        },
    );
    router.get("/admin/dashboard",
        (req, res) => {
            req.vueOptions.head.title = "Admin - Dashboard";
            res.renderVue("admin/dashboard.vue", {user: req.user}, req.vueOptions);
        },
    );
    router.get("/admin/posts",
        (req, res) => {

        Post.find({}).lean().exec(function(err, posts) {
            if (err) {
                console.log(err)
            }
            if (posts) {
                req.vueOptions.head.title = "Admin - Posts";
                res.renderVue("admin/posts.vue", {user: req.user, posts: posts}, req.vueOptions);
            } else {
                req.vueOptions.head.title = "Admin - Posts";
                res.renderVue("admin/posts.vue", {user: req.user, posts: false}, req.vueOptions);
            }
        })

        },
    );
    router.post('/admin/posts',
        (req, res) => {
            var newPost = new Post();
            newPost.author = 'notchris';
            newPost.save(function(err,post) {
            if (err) {
                console.log(err)
            }
            if (post) {
                post.set("uid", post._id, {strict: false});
                res.send(post._id)
            }
            
            });
        }
    );
    router.get("/admin/post/:id",
        (req, res) => {
            console.log(req.params)
            Post.findOne({$or: [
                {_id: req.params.id},
                {uid: req.params.id}
            ]},function(err, post) {
                if (err){
                    console.log(err)
                }
                if (post) {
                   console.log('post found')
                    req.vueOptions.head.title = "Admin - Post";
                    res.renderVue("admin/post.vue", {user: req.user, post: post._doc}, req.vueOptions);
                } else {
                    console.log('post not found')
                    res.redirect('/admin/posts')
                }
            })
        },
    );
    router.post("/admin/post/:id",
        (req, res) => {
            Post.findOne({uid: req.params.id},function(err, post) {
                if (err){
                    console.log(err)
                }
                if (post) {
                    post.title = req.body.title;
                    post.content = req.body.content;
                    post.save(function(err) {
                        if(!err) {
                            console.log("Post updated.");
                            res.send('true')
                        }
                        else {
                            console.log("Error: could not save post.");
                            res.send('false')
                        }
                    });
                } else {
                    res.send('false')
                }
            })
        },
    );
    router.post("/admin/delete/:id",
        (req, res) => {
            Post.findOneAndDelete({uid: req.params.id},function(err, post) {
                if (err){
                    console.log(err)
                }
                if (post) {
                    res.send('true')
                } else {
                    res.send('false')
                }
            })
        },
    );
    router.get("/admin/media",
        (req, res) => {
            req.vueOptions.head.title = "Admin - Media";
            res.renderVue("admin/media.vue", {user: req.user}, req.vueOptions);
        },
    );
    router.post("/admin/upload",
        (req, res) => {
          if (!req.files){
            return res.status(400).send('No files were uploaded.');
          }
          let sampleFile = req.files.sampleFile;
          sampleFile.mv(__dirname.replace('routes/admin', '') + '/assets/uploads/test.jpg', function(err) {
            if (err){
              return res.status(500).send(err);
            }
            res.send('File uploaded!');
          });
        },
    );
    router.get("/admin/pages",
        (req, res) => {
            req.vueOptions.head.title = "Admin - Pages";
            res.renderVue("admin/pages.vue", {user: req.user}, req.vueOptions);
        },
    );
    router.get("/admin/users",
        (req, res) => {
            User.find({}, function(err, users) {
                if (err) {
                    console.log(err)
                }
                if (users) {
                    req.vueOptions.head.title = "Admin - Users";
                    res.renderVue("admin/users.vue", {user: req.user, users: users}, req.vueOptions);
                } else {
                    req.vueOptions.head.title = "Admin - Users";
                    res.renderVue("admin/users.vue", {user: req.user, users: false}, req.vueOptions);
                }
            })
        },
    );
    router.get("/admin/settings",
        (req, res) => {
            req.vueOptions.head.title = "Admin - Settings";
            res.renderVue("admin/settings.vue", {user: req.user}, req.vueOptions);
        },
    );
};
function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === 'admin'){
    return next();
  } else {
    res.redirect('/');
  }
}

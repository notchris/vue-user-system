const express = require("express");
const fileUpload = require('express-fileupload');
const glob = require("glob");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compress = require("compression");
const methodOverride = require("method-override");
const cookieSession = require("cookie-session");
const helmet = require("helmet");
const validator = require("express-validator");
const expressVue = require("express-vue");
const path = require("path");

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

module.exports.init = (app, config) => {
    //Setup
    const env = process.env.NODE_ENV || "development";
    const router = express.Router();
    let logType = "dev";
    let localhost = 'http://localhost:9000/';
    app.locals.ENV = env;
    app.locals.ENV_DEVELOPMENT = (env === "development");
    app.locals.rootPath = process.env.ROOT_PATH;


    //ExpressVue Setup
    const vueOptions = {
        rootPath: path.join(__dirname, "routes"),
        head: {
        scripts: [
            { src: 'https://unpkg.com/axios/dist/axios.min.js' },
            { src: localhost+'assets/js/jquery-3.3.1.min.js' },
            { src: localhost+'assets/js/popper.min.js' },
            { src: localhost+'assets/js/bootstrap.min.js' },
            { src: 'https://cdn.quilljs.com/1.0.0/quill.js' },
            { src: 'https://unpkg.com/vanilla-datatables@latest/dist/vanilla-dataTables.min.js' }
        ],
        styles: [
            { style: 'https://cdn.quilljs.com/1.0.0/quill.snow.css' },
            { style: 'https://unpkg.com/vanilla-datatables@latest/dist/vanilla-dataTables.min.css' },
            { style: localhost+"assets/css/bootstrap.min.css" }
        ],
        },
    };

    // @ts-ignore
    const expressVueMiddleware = expressVue.init(vueOptions);
    app.use(expressVueMiddleware);

    //Security
    app.use(helmet());
    app.disable("x-powered-by");

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(validator());

    app.use(compress());

    app.use(app.locals.rootPath, express.static(config.root));

    if (env === "production") {
        app.set("trust proxy", 1);
        sessionConfig.cookie.secure = true;
        logType = "combined";
    }

    if (env === "development") {
        app.use(logger(logType));
    }

    app.use(cookieParser());

    app.use(methodOverride());

    //app.use(cookieSession(sessionConfig));

    app.use(session({ secret: 'shhsecret', resave: true, saveUninitialized: true }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(fileUpload())

    require('./config/passport')(passport);

    app.use("/", router);

    router.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
    });

    let controllers = glob.sync(config.root + "/routes/**/*.js");
    controllers.forEach(function(controller) {
        module.require(controller)(router);
    });

    function error404handler(req, res) {
        const data = {
            title: "Error 404",
        };
        req.vueOptions = {
            head: {
                title: "Error 404",
            },
        };
        res.statusCode = 404;
        res.renderVue("error.vue", data, req.vueOptions);
    }
    app.use(error404handler);

    function genericErrorHandler(error, req, res, next) {
        res.statusCode = 500;
        let data = {
            debug: env === "development",
            errorCode: error.code,
            error: error.stack,
        };
        if (res.statusCode) {
            res.renderVue("error.vue", data);
        } else {
            next();
        }
    }
    app.use(genericErrorHandler);

};

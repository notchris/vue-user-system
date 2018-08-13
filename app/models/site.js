var mongoose = require('mongoose');

var siteSchema = mongoose.Schema({
    title: String,
    url: String,
    location: String,
    description: String,
    admin: String,
    registration: Boolean,
    gravatars: Boolean
});

module.exports = mongoose.model('Site', siteSchema);

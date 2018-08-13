var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    title: String,
    content: String,
    parent: String,
    slug: String,
    status: String,
    author: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Page', pageSchema);

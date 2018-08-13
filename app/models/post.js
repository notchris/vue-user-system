var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    title: {type: String, default: 'New Post'},
    content: {type: String, default: 'Some example post content...'},
    category: {type: String, default: 'default'},
    slug: String,
    status: {type: String, default: 'draft'},
    author: String,
    created: { type: String, default: new Date() },
    uid: {type: String, default: mongoose.Types.ObjectId(this._id)}
});

module.exports = mongoose.model('Post', postSchema);

// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    videoSlug: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

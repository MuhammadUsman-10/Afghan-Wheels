const mongoose = require('mongoose');

// Define Video Schema
const videoschema = new mongoose.Schema({
    videoUrl: String,
    title: String,
    author: String,
    date: String,
    description: String,
    time: String,
    quote: String,
    comments: [{
        name: String,
        email: String,
        content: String,
        date: { type: Date, default: Date.now },
        replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
    }],
});

// Define Video model
const Video = mongoose.model('Videos', videoschema);
module.exports = Video;

const express = require('express');
const router = express.Router();
const Video = require('../models/video');
// const Comment = require('../models/commentSchema');

// Get all videos
router.get('/videos', async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        res.json({ message: error });
    }
}); 

// Get a single video
router.get('/videos/:slug', async (req, res) => {
    try {
        const video = await Video.findOne({ title: req.params.slug });
        if (!video) return res.status(404).json({ message: 'Video not found' });
        res.json(video);
        } catch (error) {
        res.status(500).json({ message: 'Server error' });
        }
});

router.post('/videos/:slug/comments', async (req, res) => {
    try{
        const video = await Video.findOne({ title: req.params.slug });
        if (!video) return res.status(404).json({ message: 'Video not found' });
        const newComment = {
            name: req.body.name,
            email: req.body.email,
            content: req.body.content,
        };


        video.comments.push(newComment);
        await video.save();

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
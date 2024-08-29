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
router.get('/videos/:id', async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json({ message: 'Video not found' });
        res.json(video);
        } catch (error) {
        res.status(500).json({ message: 'Server error' });
        }
});

//add video
router.post('/videos', async (req, res) => {
    try {
        const { title, videoUrl, author, quote, time, date, description } = req.body;

        // Validate that all required fields are provided
        if (!title || !videoUrl || !author || !quote || !time || !date || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new video
        const newVideo = new Video({
            title,
            videoUrl,
            author,
            quote,
            time,
            date,
            description
        });

        // Save the video to the database
        const savedVideo = await newVideo.save();
        res.status(201).json(savedVideo);
    } catch (error) {
        console.error('Error adding video:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

//update
router.put('/videos/:id', async (req, res) => {
    const { id } = req.params;
    const { title, videoUrl, author, quote, time, date, description} = req.body;
    try {
        // Find and update the video
        const updatedVideo = await Video.findByIdAndUpdate(
            id,
            { title, videoUrl, author, quote, time, date, description},
            { new: true } // Return the updated document and run validation
        );

        // If no video is found with the provided ID
        if (!updatedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // Respond with the updated video data
        res.json(updatedVideo);
    } catch (error) {
        console.error('Error updating video:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/videos/:id/comments', async (req, res) => {
    try{
        const video = await Video.findById(req.params.id);
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


  // Delete a video
  router.delete('/videos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedvideo = await Video.findByIdAndDelete(id);
        if (!deletedvideo) {
            return res.status(404).json({ error: 'Video not found' });
        }

        res.json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
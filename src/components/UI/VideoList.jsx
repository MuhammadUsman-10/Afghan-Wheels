import React, { useEffect, useState } from "react";
import VideoItem from "./videoItem";
import "../../styles/blog-item.css";
import axios from "axios";

const VideoList = () => {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    // Fetch video data from backend
    axios.get('http://localhost:4000/api/videos')
      .then(response => {
        setVideoData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the video data!', error);
      });
  }, []);
  return (
    <>
      {videoData.map((item) => (
        <VideoItem item={item} key={item.id} />
      ))}
    </>
  );
};

export default VideoList;

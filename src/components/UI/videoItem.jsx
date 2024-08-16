import React from "react";
import { Col } from "reactstrap";
import "../../styles/blog-item.css";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

const VideoItem = ({ item }) => {
    const { videoUrl, title, author, date, description, time } = item;

    return (
        <Col lg="4" md="6" sm="6" className="mb-5">
            <div className="video__item">
            <ReactPlayer url={videoUrl} type="video/mp4" alt="" className="w-100" height="300px" controls={true} />
            <div className="video__info p-3">
                <Link to={`/videos/${title}`} className="video__title">
                {title}
                </Link>
                <p className="section__description mt-3">
                {description.length > 100
                    ? description.substr(0, 100)
                    : description}
                </p>
    
                <Link to={`/videos/${title}`} className="read__more">
                Read More
                </Link>
    
                <div className="video__time pt-3 mt-3 d-flex align-items-center justify-content-between">
                <span className="video__author">
                    <i className="ri-user-line"></i> {author}
                </span>
    
                <div className=" d-flex align-items-center gap-3">
                    <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-calendar-line"></i> {date}
                    </span>
    
                    <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-time-line"></i> {time}
                    </span>
                </div>
                </div>
            </div>
            </div>
        </Col>
    );
};

export default VideoItem;
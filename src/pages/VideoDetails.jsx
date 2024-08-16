import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet.js";
import commentImg from "../assets/all-images/ava-1.jpg";

import "../styles/blog-details.css";

const VideoDetails = () => {
  const { slug } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    content: ''
  });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/videos/${encodeURIComponent(slug)}`); // Adjust the URL to your backend API
        if (!response.ok) {
          throw new Error("Video not found");
        }
        const data = await response.json();
        setVideo(data);
        setComments(data.comments || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [slug]);

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/videos/${slug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });
      if (!response.ok) {
        throw new Error('Failed to post comment. Signin First');

      }
      const comment = await response.json();
      setComments((prev) => [...prev, comment]);
      setNewComment({ name: '', email: '', content: '' });
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!video) return <p>No video found</p>;

  return (
    <Helmet title={video.title}>
      <section>
        <Container>
          <Row>
            <Col lg="8" md="8">
              <div className="video__details">
                <ReactPlayer url={video.videoUrl} type="video/mp4" alt="" className="w-100" height="400px" controls={true} />
                <h2 className="section__title mt-4">{video.title}</h2>

                <div className="video__publisher d-flex align-items-center gap-4 mb-4">
                  <span className="video__author">
                    <i className="ri-user-line"></i> {video.author}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-calendar-line"></i> {video.date}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-time-line"></i> {video.time}
                  </span>
                </div>

                <p className="section__description">{video.description}</p>
                <h6 className="ps-5 fw-normal">
                  <blockquote className="fs-4">{video.quote}</blockquote>
                </h6>
                <p className="section__description">{video.description}</p>
              </div>

              <div className="comment__list mt-5">
                <h4 className="mb-5">{comments.length} Comments</h4>

                <div className="single__comment d-flex gap-3">
                  {comments.map((comment, index) => (
                    <div key={index} className="single__comment d-flex gap-3">
                      <img src={commentImg} alt="" />
                      <div className="comment__content">
                        <h6 className="fw-bold">{comment.name}</h6>
                        <p className="section__description mb-0">{new Date(comment.date).toLocaleDateString()}</p>
                        <p className="section__description">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>

                {/* =============== comment form ============ */}
                <div className="leave__comment-form mt-5">
                  <h4>Leave a Comment</h4>
                  <p className="section__description">
                    You must sign-in to make or comment a post
                  </p>

                  <Form onSubmit={handleCommentSubmit}>
                    <FormGroup className=" d-flex gap-3">
                    <Input
                        type="text"
                        name="name"
                        value={newComment.name}
                        onChange={handleCommentChange}
                        placeholder="Full name"
                        required
                      />
                      <Input
                        type="email"
                        name="email"
                        value={newComment.email}
                        onChange={handleCommentChange}
                        placeholder="Email"
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                    <textarea
                        rows="5"
                        className="w-100 py-2 px-3"
                        name="content"
                        value={newComment.content}
                        onChange={handleCommentChange}
                        placeholder="Comment..."
                        required
                      ></textarea>
                    </FormGroup>

                    <button className="btn comment__btn mt-3" type="submit">
                      Post a Comment
                    </button>
                  </Form>
                </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default VideoDetails;

import React, { useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import videoData from "../assets/data/videoData.js";
import Helmet from "../components/Helmet/Helmet.js";

import commentImg from "../assets/all-images/ava-1.jpg";

import "../styles/blog-details.css";

const VideoDetails = () => {
  const { slug } = useParams();
  const video = videoData.find((video) => video.title === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [video]);

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
                <h4 className="mb-5">3 Comments</h4>

                <div className="single__comment d-flex gap-3">
                  <img src={commentImg} alt="" />
                  <div className="comment__content">
                    <h6 className=" fw-bold">David Visa</h6>
                    <p className="section__description mb-0">14 July, 2022</p>
                    <p className="section__description">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Eos nobis totam eius laborum molestias itaque minima
                      distinctio, quae velit tempore!
                    </p>

                    <span className="replay d-flex align-items-center gap-1">
                      <i className="ri-reply-line"></i> Replay
                    </span>
                  </div>
                </div>

                {/* =============== comment form ============ */}
                <div className="leave__comment-form mt-5">
                  <h4>Leave a Comment</h4>
                  <p className="section__description">
                    You must sign-in to make or comment a post
                  </p>

                  <Form>
                    <FormGroup className=" d-flex gap-3">
                      <Input type="text" placeholder="Full name" />
                      <Input type="email" placeholder="Email" />
                    </FormGroup>

                    <FormGroup>
                      <textarea
                        rows="5"
                        className="w-100 py-2 px-3"
                        placeholder="Comment..."
                      ></textarea>
                    </FormGroup>

                    <button className="btn comment__btn mt-3">
                      Post a Comment
                    </button>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default VideoDetails;

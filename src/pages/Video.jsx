import React from "react";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import VideoList from "../components/UI/VideoList";

const Video = () => {
  return (
    <Helmet title="Videos">
      <CommonSection title="Videos" />
      <section>
        <Container>
          <Row>
            <VideoList />
            {/* <VideoList /> */}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Video;

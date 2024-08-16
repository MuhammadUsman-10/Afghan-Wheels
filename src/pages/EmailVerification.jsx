import React from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/contact.css";


const EmailVerification = () => {

    const custom_style = {
        background: "lightgreen",
        padding: "26px 204px",
        borderRadius: "7px",
        color: "white",
    }
    
    return (
        <Helmet title="Email Verification">
        <CommonSection title="Email Verification" />
        <section>
            <Container>
            <Row>
                <Col lg="12" md="12">
                <div className="" style={custom_style}>
                <h1 className="font-bold text-xl">Thanks for your registration</h1>
                <p className="font-medium">
                    Please check your email for Verification
                </p>
                </div>
                </Col>
            </Row>
            </Container>
        </section>
        </Helmet>
    );
};

export default EmailVerification;

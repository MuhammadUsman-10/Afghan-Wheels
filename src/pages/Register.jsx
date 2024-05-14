import React from "react";
// import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../styles/contact.css";


const Register = () => {
    return (
        <Helmet title="Register">
        <CommonSection title="Register" />
        <section>
            <Container>
            <Row>
                <Col lg="7" md="7">
                <h6 className="fw-bold mb-4">Register to Afghan Wheels</h6>

                <Form>
                    <FormGroup className="contact__form">
                    <Input placeholder="Fisrt Name" type="text" required/>
                    </FormGroup>

                    <FormGroup className="contact__form">
                    <Input placeholder="Last Name" type="text" required/>
                    </FormGroup>

                    <FormGroup className="contact__form">
                    <Input placeholder="Email" type="email" required/>
                    </FormGroup>
                    
                    <FormGroup className="contact__form">
                    <Input placeholder="Password" type="password" required/>
                    </FormGroup>

                    <button className=" contact__btn" >
                    Register
                    </button>
                </Form>
                </Col>

                <Col lg="5" md="5">
                    <div className="contact__info">
                        <h6 className="fw-bold">Afghan Wheels</h6>
                        <p className="section__description mb-0">
                        Best Car Buy & Selling Serices in Afghanistan
                        </p>
                        <div className=" d-flex align-items-center gap-2">
                        <h6 className="fs-6 mb-0">Phone:</h6>
                        <p className="section__description mb-0">+88683896366</p>
                        </div>

                        <div className=" d-flex align-items-center gap-2">
                        <h6 className="mb-0 fs-6">Email:</h6>
                        <p className="section__description mb-0">example@gmail.com</p>
                        </div>
                        <h6 className="fw-bold mt-4">Follow Us</h6>
                    </div>
                </Col>
            </Row>
            </Container>
        </section>
        </Helmet>
    );
};

export default Register;

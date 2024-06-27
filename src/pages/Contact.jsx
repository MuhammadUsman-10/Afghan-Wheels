import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import axios from "axios";

import "../styles/contact.css";

const socialLinks = [
  {
    url: "#",
    icon: "ri-facebook-line",
  },
  {
    url: "#",
    icon: "ri-instagram-line",
  },
  {
    url: "#",
    icon: "ri-linkedin-line",
  },
  {
    url: "#",
    icon: "ri-twitter-line",
  },
];

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault();

    // Manual validation
    if (!name && !email && !message) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    if (!name && !message) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    if (!name) {
      setErrorMessage('Please enter Name.');
      return;
    }
    if (!email) {
      setErrorMessage('Please enter Email.');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Please enter valid Email.');
      return;
    }
    if (!message) {
      setErrorMessage('Please enter Message.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:4000/api/submit', {
        name,
        email,
        message,
      });


      // Handle successful submit
      console.log(response.data);
      setSuccessMessage('Form Submitted successfully');
      
      // Redirect to Submit component 
      navigate('/Contact');
    } 
    catch (error) {
      // Handle submit errors
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.errors);
      } 
      else {
        console.error('Error Submitting Form:', error.message);
      }
    }
  };
  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Get In Touch</h6>

              <Form>
                <FormGroup className="contact__form">                  
                  <Input 
                    placeholder="Name"
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input 
                    placeholder="Email"
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                    rows="5"
                    placeholder="Message"
                    className="textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </FormGroup>

                <button className="contact__btn" type="submit" onClick={handleSubmit}>
                  Send Message
                </button>
              </Form>
              {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
              {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="section__description mb-0">
                  123 ZindaBazar, Kabul, Afghanitan
                </p>
                <div className=" d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Phone:</h6>
                  <p className="section__description mb-0">+0995345875365</p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className="section__description mb-0">afghanwheels@gmail.com</p>
                </div>

                <h6 className="fw-bold mt-4">Follow Us</h6>

                <div className=" d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index}
                      className="social__link-icon"
                    >
                      <i className={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;

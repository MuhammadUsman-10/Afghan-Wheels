import {React, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import axios from "axios";

import "../styles/contact.css";


const AdminRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignup = async (event) => {
        event.preventDefault();

        // Manual validation
        if (!email && !password) {
            setErrorMessage('Please fill in all required fields.');
            return;
        } else if (!email) {
            setErrorMessage('Please enter Email.');
            return;
            }else if (!validateEmail(email)) {
                setErrorMessage('Please enter valid Email.');
                return;
        }else if (!password) {
            setErrorMessage('Please enter password.');
            return;
        }
        
        try {
        const response = await axios.post('http://localhost:4000/api/admin/signup', {
            email,
            password,
        });

        // Handle successful signup
        console.log(response.data);
        setSuccessMessage('Admin registered successfully');
        
        // Redirect to SignIn component after a brief delay
        setTimeout(() => {
            navigate('/admin/login');
        }, 2000);
        } catch (error) {
        // Handle signup errors
        if (error.response && error.response.data) {
            setErrorMessage(error.response.data.errors);
        } else {
            console.error('Error signing up:', error.message);
        }
        }
    };
    return (
        <Helmet title="Admin Register">
        <CommonSection title="Admin Register" />
        <section>
            <Container>
            <Row>
                <Col lg="7" md="7">
                <h6 className="fw-bold mb-4">Register to Admin Dashboard</h6>

                <Form>
                    <FormGroup className="contact__form">
                    <Input placeholder="Email" type="email" 
                    value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </FormGroup>
                    
                    <FormGroup className="contact__form">
                    <Input placeholder="Password" type="password"
                    value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </FormGroup>

                    {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                    {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
                    <p>
                    Already have an account? <Link to="/login">Login Here</Link>
                    </p>
                    <button className=" contact__btn" type='button' onClick={handleSignup} >
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

export default AdminRegister;

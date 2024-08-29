import {React, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import axios from "axios";

import "../styles/contact.css";


const Register = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const validateMobile = (mobile) => {
        const mobileRegex = /^\+?\d{10,15}$/;
        return mobileRegex.test(mobile);
    }
    const handleSignup = async (event) => {
        event.preventDefault();

        // Manual validation
        if (!firstname && !lastname && !mobile && !email && !password) {
            setErrorMessage('Please fill in all required fields.');
            return;
        } else if (!firstname) {
            setErrorMessage('Please fill in all required fields.');
            return;
        } else if (!lastname) {
            setErrorMessage('Please fill in all required fields.');
            return;
        } else if (!mobile) {
            setErrorMessage('Please fill in all required fields.');
            return;
        }else if (!validateMobile(mobile)) {
            setErrorMessage('Invalid mobile number. It should be between 10 and 15 digits long and may include an optional leading +.');
            return;
        } else if (!email && !password) {
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
            }else if (!validatePassword(password)) {
                setErrorMessage('Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.');
            return;
        }
        if (!validateEmail(email)) {
            setErrorMessage('Please enter valid Email.');
            return;
        }
        
        try {
        const response = await axios.post('http://localhost:4000/api/signup', {
            firstname,
            lastname,
            mobile,
            email,
            password,
        });
        if (response.status===201){
            console.log(response.data);
            setSuccessMessage('User registered successfully');
            setErrorMessage('');
            setTimeout(() => {
                navigate('/EmailVerification');
            }, 2000);
        }
        else{
            alert('User already Exist');
        }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrorMessage(error.response.data.errors.map(err => err.msg).join('\n'));
            } else if (error.response && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('An unexpected error occurred.');
                console.error('Error registering user:', error.message);
            }
        }
    };

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
                    <Input placeholder="Fisrt Name" type="text" 
                    value={firstname} onChange={(e)=>setFirstname(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="contact__form">
                    <Input placeholder="Last Name" type="text" 
                    value={lastname} onChange={(e)=>setLastname(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="contact__form">
                    <Input placeholder="Mobile Number" type="digits"
                    value={mobile} onChange={(e)=>setMobile(e.target.value)} />
                    </FormGroup>

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

export default Register;
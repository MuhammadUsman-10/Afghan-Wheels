import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { login } from "../Redux/userActions"
import Message from "../components/UI/error";
import "../styles/contact.css";


const Login = (location) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const redirect = new URLSearchParams(location.search).get('redirect') || "/";

    const userLogin = useSelector((state) => state.userLogin);
    const { error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }       
    }, [navigate, userInfo, redirect]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignIn = async (event) => {
        
        event.preventDefault();

        // Manual validation
        if (!email && !password) {
            setErrorMessage('Please fill in all required fields.');
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
        
        if (!password) {
            setErrorMessage('Please enter password.');
            return;
        }
        
            dispatch(login(email, password));
        
        setEmail('');
        setPassword('');
        
    };

    return (
        <Helmet title="Login">
        <CommonSection title="Login" />
        <section>
            <Container>
            <Row>
                <Col lg="7" md="7">
                <h6 className="fw-bold mb-4">Login to Afghan Wheels</h6>

                <Form onSubmit={handleSignIn}>
                    <FormGroup className="contact__form">
                    <Input placeholder="Email" type="email" 
                    value={email} onChange={(e)=>setEmail(e.target.value)}
                    autoComplete="off" />
                    </FormGroup>
                    
                    <FormGroup className="contact__form">
                    <Input placeholder="Password" type="password" 
                    value={password} onChange={(e)=>setPassword(e.target.value)}
                    autoComplete="off" />
                    </FormGroup>

                    {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                    {error && <Message variant="alert-danger"> {error} </Message>}
                    {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
                    <p>
                    Don't have an account? <Link to="/register">SignUp Here</Link>
                    </p>
                    <button className="contact__btn" type='button' onClick={handleSignIn}>
                    Login
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

export default Login;

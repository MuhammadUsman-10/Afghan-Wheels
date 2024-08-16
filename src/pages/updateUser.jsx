import React, { useState, useEffect } from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import {userUpdate} from '../Redux/userActions';
import { Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

const UpdateUser = () => {
    const [firstname, setFisrtname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.userDetails);
    const { user } = userDetails;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { loading: updateLoading, success: updateSuccess } = userUpdateProfile;

    useEffect(() => {
        if (updateSuccess) {
            alert('User profile updated successfully');
        }
    }, [updateSuccess]);

    useEffect(() => {
        if (user) {
            setFisrtname(user.firstname);
            setLastname(user.lastname);
            setEmail(user.email);
            setMobile(user.mobile);
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmpassword){
            alert('Password do not match');
        }
        else{
            dispatch(userUpdate({
                firstname,
                lastname,
                email,
                mobile,
                password
            }));
        }
    };

    return (
        <Helmet title="Update User">
        <CommonSection title="Update User" />
        <section>
            <Container>
            <Row>
                <Col lg="7" md="7">
                <h6 className="fw-bold mb-4">Update User Profile</h6>

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <label>First Name</label>
                        <Input placeholder="First Name" type="text"
                        value={firstname}
                        onChange={(e)=>setFisrtname(e.target.value)} />
                    </FormGroup>

                    <FormGroup>
                        <label>Last Name</label>
                        <Input placeholder="Last Name" type="text"
                        value={lastname} 
                        onChange={(e)=>setLastname(e.target.value)}/>
                    </FormGroup>

                    <FormGroup className="contact__form">
                        <label>Email</label>
                        <Input placeholder="Email" type="email" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)} />
                    </FormGroup>
                    
                    <FormGroup className="contact__form">
                        <label>Mobile</label>
                        <Input placeholder="Mobile" type="text" 
                        value={mobile}
                        onChange={(e)=>setMobile(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="contact__form">
                        <label>Password</label>
                        <Input placeholder="Password" type="password" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}/>
                    </FormGroup>

                    <FormGroup className="contact__form">
                        <label>Confirm Password</label>
                        <Input placeholder="Confirm Password" type="password" 
                        value={confirmpassword} 
                        onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    </FormGroup>

                    <button className="contact__btn" type='button' onClick={handleSubmit}>
                        Save
                    </button>
                </Form>
                </Col>
            </Row>
            </Container>
        </section>
        </Helmet>
    );
};

export default UpdateUser;
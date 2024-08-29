import React from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { userDetails } from '../Redux/userActions';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';
import usePersistedUserState from '../components/UI/persistedHook';


const UserProfile = () => {
    window.scrollTo(0, 0);
    // const dispatch = useDispatch();

    // Using the custom hook to get the persisted user info
    const [userInfo] = usePersistedUserState('userInfo', null);

    // useEffect(() => {
    //     if (userInfo) {
    //         dispatch(userDetails("profile"));
    //     }
    // }, [dispatch, userInfo]);
    return (
        <Helmet title="User Profile">
        <CommonSection title="User Profile" />
        <section>
            <Container>
            <Row>
                <Col lg="7" md="7">
                <h6 className="fw-bold mb-4">Welcome To User Profile</h6>

                <Form>
                    <FormGroup>
                        <label>First Name</label>
                        <Input placeholder="First Name" type="text"
                        value={userInfo.firstname} />
                    </FormGroup>

                    <FormGroup>
                        <label>Last Name</label>
                        <Input placeholder="Last Name" type="text"
                        value={userInfo.lastname} />
                    </FormGroup>

                    <FormGroup className="contact__form">
                        <label>Email</label>
                        <Input placeholder="Email" type="email" 
                        value={userInfo.email} />
                    </FormGroup>
                    
                    <FormGroup className="contact__form">
                        <label>Mobile</label>
                        <Input placeholder="Mobile" type="text" 
                        value={userInfo.mobile} />
                    </FormGroup>

                    <FormGroup className="contact__form">
                        <label>Role</label>
                        <Input placeholder="Mobile" type="text" 
                        value={userInfo.role} />
                    </FormGroup>

                    <button className="contact__btn" type='button'>
                        <Link to="/updateUser" className="text-decoration-none text-white">
                        Edit
                        </Link>
                    </button>
                </Form>
                </Col>
            </Row>
            </Container>
        </section>
        </Helmet>
    );
};

export default UserProfile;
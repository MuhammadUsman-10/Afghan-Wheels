// import React, {useState, useEffect} from "react";
// import { useNavigate } from "react-router-dom";
// import {useSelector, useDispatch} from "react-redux"
// import { Container, Row, Col } from "reactstrap";
// import Helmet from "../components/Helmet/Helmet";
// import CommonSection from "../components/UI/CommonSection";
// import { login } from "../Redux/userActions"
// import "../styles/contact.css";


// const EmailVerificationLogin = (location) => {

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [loginUsingGmail, setLoginUsingGmail] = useState(false);
    
//     const navigate = useNavigate();

//     const dispatch = useDispatch();

//     const redirect = new URLSearchParams(location.search).get('redirect') || "/";

//     const userLogin = useSelector((state) => state.userLogin);
//     const { userInfo } = userLogin;

//     useEffect(() => {
//         if(userInfo){
//             navigate(redirect);
//         }        
//     }, [navigate, userInfo, redirect]);

//     useEffect(() => {

//         const params = new URLSearchParams(window.location.search);
//         const emailParam = params.get("email");
//         const passwordParam = params.get("password");
//         const loginUsingGmailParam = params.get("login_using_gmail") === 'true';
    
//         setEmail(emailParam);
//         setPassword(passwordParam);
//         setLoginUsingGmail(loginUsingGmailParam);
    
//         const sendData = async (emailParam, passwordParam, loginUsingGmailParam) => {

//           try {

//             console.log(emailParam, passwordParam, loginUsingGmailParam);
//               dispatch(login(emailParam, passwordParam, loginUsingGmailParam));
    
//           } catch (error) {
//             console.error("Error sending data:", error);
//           }
//         };
    
//         sendData(emailParam, passwordParam, loginUsingGmailParam);
//       }, [dispatch]);
//     return (
//         <Helmet title="Login">
//         <CommonSection title="Login" />
//         <section>
//             <Container>
//             <Row>
//                 <Col lg="12" md="12">
//                 <div className="border border-[#88C7F5] max-w-screen-xlg m-20 rounded-md p-4 bg-[#ccffcc]">
//                 <h1 className="font-bold text-xl">Verification</h1>
//                 <p>Email: {email}</p>
//                 <p>Password: {password}</p>
//                 <p>Login using Gmail: {loginUsingGmail ? "Yes" : "No"}</p>
//                 </div>
//                 </Col>
//             </Row>
//             </Container>
//         </section>
//         </Helmet>
//     );
// };

// export default EmailVerificationLogin;
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { login } from "../Redux/userActions"
import "../styles/contact.css";


const EmailVerificationLogin = (location) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginUsingGmail, setLoginUsingGmail] = useState(false);
    
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const redirect = new URLSearchParams(location.search).get('redirect') || "/";

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }        
    }, [navigate, userInfo, redirect]);

    useEffect(() => {

        const params = new URLSearchParams(window.location.search);
        const emailParam = params.get("email");
        const passwordParam = params.get("password");
        const loginUsingGmailParam = params.get("login_using_gmail") === 'true';
    
        setEmail(emailParam);
        setPassword(passwordParam);
        setLoginUsingGmail(loginUsingGmailParam);
    
        const sendData = async (emailParam, passwordParam, loginUsingGmailParam) => {

          try {

            console.log(emailParam, passwordParam, loginUsingGmailParam);
              dispatch(login(emailParam, passwordParam, loginUsingGmailParam));
    
          } catch (error) {
            console.error("Error sending data:", error);
          }
        };
    
        sendData(emailParam, passwordParam, loginUsingGmailParam);
      }, [dispatch]);
    return (
        <Helmet title="Login">
        <CommonSection title="Login" />
        <section>
            <Container>
            <Row>
                <Col lg="12" md="12">
                <div className="border border-[#88C7F5] max-w-screen-xlg m-20 rounded-md p-4 bg-[#ccffcc]">
                <h1 className="font-bold text-xl">Verification</h1>
                <p>Email: {email}</p>
                <p>Password: {password}</p>
                <p>Login using Gmail: {loginUsingGmail ? "Yes" : "No"}</p>
                </div>
                </Col>
            </Row>
            </Container>
        </section>
        </Helmet>
    );
};

export default EmailVerificationLogin;

import React from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";

const BookingForm = () => {
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [fromAddress, setFromAddress] = React.useState("");
  const [toAddress, setToAddress] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState('');

  const validateMobile = (mobile) => {
    const mobileRegex = /^\+?\d{10,15}$/;
    return mobileRegex.test(mobile);
}

  const submitHandler = async(event) => {
    event.preventDefault();

    if (mobile) {
      if (!validateMobile(mobile)) {
      setErrorMessage('Invalid mobile number. It should be between 10 and 15 digits long and may include an optional leading +.');
      return;
      }}

    const bookingData = {
      firstname,
      lastname,
      email,
      mobile,
      fromAddress,
      toAddress,
      message,
    };  
    try {
      const response = await fetch('http://localhost:4000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      const data = await response.json();
      if (response.ok){
        alert('Booking successfully created');
      }else{
        alert(data.error);
      }
      console.log(data);
        setFirstname ('');
        setLastname('');
        setEmail('');
        setMobile('');
        setFromAddress('');
        setToAddress('');
        setMessage('');
        setErrorMessage('');
    } catch (error) {
      if (error.response && error.response.data) {
          alert(error.response.data.error);
      }
    }
  }
  
  return (
    <Form onSubmit={submitHandler}>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} required/>
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="digits" placeholder="Phone Number" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="text" placeholder="From Address" value={fromAddress} onChange={(e) => setFromAddress(e.target.value)} required />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="text" placeholder="To Address" value={toAddress} onChange={(e) => setToAddress(e.target.value)} required />
      </FormGroup>

      <FormGroup>
        <textarea
          rows={5}
          type="textarea"
          className="textarea"
          placeholder="Write"
          value={message} onChange={(e) => setMessage(e.target.value)} 
          required
        ></textarea>
      </FormGroup>
      {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}

      <FormGroup className="booking__form  mt-3" type='button' onSubmit={submitHandler}>
        <button>Book Now</button>
      
      </FormGroup>
    </Form>
  );
};

export default BookingForm;

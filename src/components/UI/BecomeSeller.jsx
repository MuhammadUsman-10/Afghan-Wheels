import { React, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../Helmet/Helmet";
import CommonSection from "./CommonSection";
import axios from "axios";
import "../../styles/contact.css";


const BecomeSeller = () => {
  const [category, setCategory] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [variant, setVariant] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category', category);
    formData.append('make', make);
    formData.append('model', model);
    formData.append('city', city);
    formData.append('price', price);
    formData.append('variant', variant);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }
    try {
      const response = await axios.post('http://localhost:4000/api/becomeseller', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Handle successful submit
      console.log(response.response);
      setSuccessMessage('Form Submitted successfully');
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
    <Helmet title="Become Seller">
    <CommonSection title="Become Seller" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Become a Seller</h6>
              <div>
                <Form className="form" onSubmit={handleSubmit}>
                  <div className=" d-flex align-items-center justify-content-between flex-wrap">
                  <FormGroup className="select__group">
                    <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Category</option>
                      <option value="New Car">New Car</option>
                      <option value="Used Car">Used Car</option>
                    </select>
                  </FormGroup>

                  <FormGroup className="form__group">
                    <Input placeholder="Make" name="Make" value={make} onChange={(e) => setMake(e.target.value)}/>
                  </FormGroup>

                  <FormGroup className="form__group">
                    <Input placeholder="Model" name="Model" value={model} onChange={(e) => setModel(e.target.value)} /> 
                  </FormGroup>

                  <FormGroup className="form__group">
                    <Input type="text" placeholder="Select City" name="city" value={city} onChange={(e) => setCity(e.target.value)}  />
                  </FormGroup>

                  <FormGroup className="form__group">
                  <div className="d-flex align-items-center">
                    <Input type="range"
                    id="priceSlider"
                    name="price"
                    min="500000"
                    max="5000000"
                    step="50000" // Adjust step size if neede 
                    value={price} onChange={(e) => setPrice(e.target.value)} />
                    <span className="ms-3">{price.toLocaleString()}</span> {/* Display selected value */}
                  </div>
                  </FormGroup>

                  <FormGroup className="select__group">
                    <select name="variant" value={variant} onChange={(e) => setVariant(e.target.value)}>
                      <option value="">Variant</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </FormGroup> 

                    <FormGroup className="form__group">
                      <input
                        type="file"
                        accept="image" // Accept only image files
                        onChange={(e) => setImage(e.target.files[0])} // Store the selected image file in state
                      />
                    </FormGroup>

                    <FormGroup className="contact__form">
                      <textarea
                        rows="1"
                        placeholder="Description"
                        className="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </FormGroup>

                    <FormGroup className="form__group">
                      <button type="submit" className="btn find__car-btn">Submit</button>
                    </FormGroup>
                    {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                    {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}

                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>

  );
};

export default BecomeSeller;

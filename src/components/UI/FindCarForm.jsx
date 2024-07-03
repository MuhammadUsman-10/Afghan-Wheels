import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/find-car-form.css";
import "../../styles/find-car-form.css";
import { Col, Form, FormGroup } from "reactstrap";
import axios from "axios";

const FindCarForm = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    category: '',
    variant: '',
    city: '',
    price: ''
  });
  const [cars, setCars] = useState([]);
  const [searched, setSearched] = useState(false); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const filteredFormData = Object.keys(formData)
      // .filter(key => formData[key] !== '')
      // .reduce((acc, key) => ({
      //     ...acc,
      //     [key]: formData[key]
      // }), {});
      const filteredFormData = {};
      for (const key in formData) {
          if (formData[key] !== '') {
              filteredFormData[key] = formData[key];
          }
      }
      console.log('Filtered Form Data:', filteredFormData);
      const response = await axios.post('http://localhost:4000/api/searchcar', filteredFormData);
      setCars(response.data);
      setSearched(true);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  return (
    <div><Form className="form" onSubmit={handleSubmit}>
      <div className=" d-flex align-items-center justify-content-between flex-wrap">

        <FormGroup className="select__group">
          <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">Category</option>
            <option value="New Car">New Car</option>
            <option value="Used Car">Used Car</option>
          </select>
        </FormGroup>

        <FormGroup className="select__group">
          <select name="make" value={formData.make} onChange={handleChange}>
          <option value="">Make</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="BMW">BMW</option>
            <option value="Nissan">Nissan</option>
            <option value="Mercedez">Mercedez</option>
          </select>
        </FormGroup>

        <FormGroup className="select__group">
          <select name="model" value={formData.model} onChange={handleChange}> 
            <option value="">Model</option>
            <option value="Toyota Corolla">Toyota Corolla</option>
            <option value="Toyota Aqua">Toyoyta Aqua</option>
            <option value="Nissan Mercielago">Nissan Mercielago</option>
            <option value="Mercedez Benz XC90">Mercedez Benz XC90</option>
            <option value="Toyota Camry">Toyota Camry</option>
            <option value="BMW X3">BMW X3</option>
            <option value="Honda Civic">Honda Civic</option>
            <option value="Mercedez Benz C63">Mercedez Benz C63</option>
          </select>
        </FormGroup>

        <FormGroup className="form__group">
          <input type="text" placeholder="Select City" name="city" value={formData.city} onChange={handleChange}  />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="digits" placeholder="Select Budget" name="price" value={formData.price} onChange={handleChange} />
        </FormGroup>

        <FormGroup className="select__group">
          <select name="variant" value={formData.variant} onChange={handleChange}>
            <option value="">Variant</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </FormGroup> 

        <FormGroup className="form__group">
          <button type="submit" className="btn find__car-btn">Find Car</button>
        </FormGroup>
      </div>
    </Form>
    {searched && (
          <div className="row">
          {cars.length > 0 ? (
            cars.map((car, index) => (
              <Col lg="4" md="4" sm="6" className="mb-5" key={index}>
                <div className="car__item">
                  <div className="car__img">
                    <img src={`${car.imageURL}`} type="image/png" alt={`${car.make} ${car.model}`} className="w-100" />
                  </div>
    
                  <div className="car__item-content mt-4">
                    <h4 className="section__title text-center">{car.model}</h4>
                    <h6 className="rent__price text-center mt-">
                      AFN {car.price}.00
                    </h6>
    
                    <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
                      <span className=" d-flex align-items-center gap-1">
                        <i className="ri-car-line"></i> {car.category}
                      </span>
                      <span className=" d-flex align-items-center gap-1">
                        <i className="ri-settings-2-line"></i> {car.variant}
                      </span>
                      {/* Assuming speed is a property of car */}
                      <span className=" d-flex align-items-center gap-1">
                        <i className="ri-timer-flash-line"></i> {car.speed}
                      </span>
                    </div>
    
                    <button className="w-50 car__item-btn car__btn-rent">
                      <Link to={`/cars/${car.model}`}>Buy</Link>
                    </button>
    
                    <button className="w-50 car__item-btn car__btn-details">
                      <Link to={`/cars/${car.model}`}>Details</Link>
                    </button>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <p>No cars found</p>
          )}
        </div>
    )} 
    </div>
  );
};

export default FindCarForm;

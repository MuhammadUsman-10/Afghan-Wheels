import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/find-car-form.css";
import { Col, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";

const FindCarForm = () => {
  const [category, setCategory] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('500000');
  const [variant, setVariant] = useState('');
  const [cars, setCars] = useState([]);
  const [searched, setSearched] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdData = {
      category,
      make,
      model,
      city,
      price,
      variant
    };
    try {
      const response = await axios.post('http://localhost:4000/api/searchcar', formdData);
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
          <button type="submit" className="btn find__car-btn">Find Car</button>
        </FormGroup>
      </div>
    </Form>
    {searched && (
          <div className="row">
          {cars.length > 0 ? (
            cars.map((car, index) => (
              <Col lg="5" md="4" sm="6" className="mb-5" key={index}>
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
                        <i className="ri-map-pin-line"></i> {car.city}
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

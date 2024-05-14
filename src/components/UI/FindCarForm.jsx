import { useState } from "react";
import React from "react";
import "../../styles/find-car-form.css";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";

const FindCarForm = () => {
  const [formData, setFormData] = useState({
    category: 'selectcategory',
    make: 'selectmake',
    model: 'selectmodel',
    city: '',
    budget: '',
    transmission: 'ac'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/carsroute/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const searchData = await response.json();
      console.log(searchData);
    } 
    catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <div className=" d-flex align-items-center justify-content-between flex-wrap">

        <FormGroup className="select__group">
          <select name="category" value={formData.category} onChange={handleChange}>
          <option value="selectcategory">Category</option>
            <option value="newcars">New Cars</option>
            <option value="usedcars">Used Cars</option>
            <option value="category">Sedan</option>
            <option value="category">SUV</option>
            <option value="ac">Family Car</option>
          </select>
        </FormGroup>

        <FormGroup className="select__group">
          <select name="make" value={formData.make} onChange={handleChange}>
          <option value="selectmake">Make</option>
            <option value="make">Toyota</option>
            <option value="make">Honda</option>
            <option value="make">Suzuki</option>
            <option value="make">Nissan</option>
            <option value="make">Mazda</option>
          </select>
        </FormGroup>

        <FormGroup className="select__group">
          <select name="model" value={formData.model} onChange={handleChange}> 
            <option value="selectmodel">Model</option>
            <option value="make">Corolla</option>
            <option value="make">Vezel</option>
            <option value="make">Aqua</option>
            <option value="make">Nissan Sunny</option>
            <option value="make">Mazda RX8</option>
            <option value="make">Toyota Revo</option>
            <option value="make">Ciaz</option>
            <option value="make">Wagon-R</option>
            <option value="make">Civic</option>
            <option value="make">Premio</option>
          </select>
        </FormGroup>

        <FormGroup className="form__group">
          <input type="text" placeholder="Select City" />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="number" placeholder="Select Budget" />
        </FormGroup>

        <FormGroup className="select__group">
          <select name="variant" value={formData.variant} onChange={handleChange}>
            <option value="selectvariant">Variant</option>
            <option value="ac">Automatic</option>
            <option value="non-ac">Manual</option>
          </select>
        </FormGroup>

        <FormGroup className="form__group">
          <button type="submit" className="btn find__car-btn">Find Car</button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;

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
    price: '',
    variant: 'selectvariant'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/searchcar', {
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
            <option value="category">New Cars</option>
            <option value="category">Used Cars</option>
          </select>
        </FormGroup>

        <FormGroup className="select__group">
          <select name="make" value={formData.make} onChange={handleChange}>
          <option value="selectmake">Make</option>
            <option value="make">Toyota</option>
            <option value="make">Honda</option>
            <option value="make">BMW</option>
            <option value="make">Nissan</option>
            <option value="make">Mercedez</option>
          </select>
        </FormGroup>

        <FormGroup className="select__group">
          <select name="model" value={formData.model} onChange={handleChange}> 
            <option value="selectmodel">Model</option>
            <option value="model">Toyota Corolla</option>
            <option value="model">Toyoyta Aqua</option>
            <option value="model">Nissan Mercielago</option>
            <option value="model">Mercedez Benz XC90</option>
            <option value="model">Toyota Camry</option>
            <option value="model">BMW X3</option>
            <option value="model">Honda Civic</option>
            <option value="model">Mercedez Benz C63</option>
          </select>
        </FormGroup>

        <FormGroup className="form__group">
          <input type="text" placeholder="Select City"  />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="digits" placeholder="Select Budget" />
        </FormGroup>

        <FormGroup className="select__group">
          <select name="variant" value={formData.variant} onChange={handleChange}>
            <option value="selectvariant">Variant</option>
            <option value="variant">Automatic</option>
            <option value="variant">Manual</option>
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

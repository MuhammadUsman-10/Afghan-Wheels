import React, {useState, useEffect} from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import axios from 'axios';

const CarListing = () => {
  const [sortOption, setSortOption] = useState('select');
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/cars'); // Adjust the endpoint as necessary
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    fetchCars();
  }, []);
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedCarData = [...cars].sort((a, b) => {
    if (sortOption === 'low') {
      return a.price - b.price;
    } else if (sortOption === 'high') {
      return b.price - a.price;
    } else {
      return 0; // Default order if 'select' is chosen
    }
  });
  
  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Sort By
                </span>

                <select onChange={handleSortChange}>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col>

            {sortedCarData.map((car) => (
              <CarItem key={car._id} item={car} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;

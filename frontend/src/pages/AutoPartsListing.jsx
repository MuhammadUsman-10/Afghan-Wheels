import React, {useState, useEffect} from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import PartItem from "../components/UI/autopartsItem";
import axios from 'axios';

const PartsListing = () => {
    const [sortOption, setSortOption] = useState('select');
    const [parts, setParts] = useState([]);

    useEffect(() => {
        const fetchParts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/parts'); // Adjust the endpoint as necessary
            setParts(response.data);
        } catch (error) {
            console.error('Error fetching car data:', error);
        }
        };

        fetchParts();
    }, []);

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const sortedautopartsData = [...parts].sort((a, b) => {
        if (sortOption === 'low') {
        return a.price - b.price;
        } else if (sortOption === 'high') {
        return b.price - a.price;
        } else {
        return 0; // Default order if 'select' is chosen
        }
    });
    
    return (
        <Helmet title="AutoParts">
        <CommonSection title="Auto Parts" />

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

                {sortedautopartsData.map((part) => (
                <PartItem item={part} key={part._id} />
                ))}
            </Row>
            </Container>
        </section>
        </Helmet>
    );
};

export default PartsListing;

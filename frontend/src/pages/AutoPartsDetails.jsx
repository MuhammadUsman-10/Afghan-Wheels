import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import axios from "axios";

const PartDetails = () => {
    const { id } = useParams();
    const [part, setPart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPart = async () => {
            try {
            const response = await axios.get(`http://localhost:4000/api/parts/${id}`); // Adjust the endpoint as necessary
            setPart(response.data);
            setLoading(false);
            } catch (err) {
            setError(err);
            setLoading(false);
            }
        };
    
        fetchPart();
        }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading Part details: {error.message}</p>;
    if (!part) return <p>Part not found</p>;
    return (
        <Helmet title={part.partName}>
        <section>
            <Container>
            <Row>
                <Col lg="6">
                <img src={part.imageUrl} alt="" className="w-80" />
                </Col>

                <Col lg="6">
                <div className="car__info">
                    <h2 className="section__title">{part.partName}</h2>

                    <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                        <h6 className="rent__price fw-bold fs-4">
                            AFN {part.price}.00
                        </h6>
                    </div>

                    <p className="section__description">
                    {part.description}
                    </p>
                </div>
                </Col>

                <Col lg="7" className="mt-5">
                    <div className="booking-info mt-5">
                        <h5 className="mb-4 fw-bold ">Buyer Information</h5>
                        <BookingForm />
                    </div>
                </Col>

            </Row>
            </Container>
        </section>
        </Helmet>
    );
};

export default PartDetails;

import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import autopartsData from "../assets/data/autopartsData";

const PartDetails = () => {
    const { slug } = useParams();

    const singlepartItem = autopartsData.find((item) => item.partName === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [singlepartItem]);

    return (
        <Helmet title={singlepartItem.carName}>
        <section>
            <Container>
            <Row>
                <Col lg="6">
                <img src={singlepartItem.imgUrl} alt="" className="w-80" />
                </Col>

                <Col lg="6">
                <div className="car__info">
                    <h2 className="section__title">{singlepartItem.partName}</h2>

                    <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                        <h6 className="rent__price fw-bold fs-4">
                            AFN {singlepartItem.price}.00
                        </h6>

                        <span className=" d-flex align-items-center gap-2">
                            <span style={{ color: "#f9a826" }}>
                            <i className="ri-star-s-fill"></i>
                            <i className="ri-star-s-fill"></i>
                            <i className="ri-star-s-fill"></i>
                            <i className="ri-star-s-fill"></i>
                            <i className="ri-star-s-fill"></i>
                            </span>
                            ({singlepartItem.rating} ratings)
                        </span>
                    </div>

                    <p className="section__description">
                    {singlepartItem.description}
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

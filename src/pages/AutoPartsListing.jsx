import React from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import PartItem from "../components/UI/autopartsItem";
import autopartsData from "../assets/data/autopartsData";

const PartsListing = () => {
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

                    <select>
                    <option>Select</option>
                    <option value="low">Low to High</option>
                    <option value="high">High to Low</option>
                    </select>
                </div>
                </Col>

                {autopartsData.map((item) => (
                <PartItem item={item} key={item.id} />
                ))}
            </Row>
            </Container>
        </section>
        </Helmet>
    );
};

export default PartsListing;

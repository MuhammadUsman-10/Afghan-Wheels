import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/autoparts.css";

const AutoPartItem = (props) => {
    const { imgUrl, model, partName, price } = props.item;

    return (
        <Col lg="4" md="4" sm="6" className="mb-5">
        <div className="car__item">
            <div className="car__img">
            <img src={imgUrl} alt="" className="w-80" />
            </div>

            <div className="car__item-content mt-4">
            <h4 className="section__title text-center">{partName}</h4>
            <h6 className="rent__price text-center mt-">
                Rs:{price}.00/-
            </h6>

            <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
                <span className=" d-flex align-items-center gap-1">
                <i className="ri-car-line"></i> {model}
                </span>
            </div>

            <button className=" w-50 car__item-btn car__btn-rent">
                <Link to={`/autoparts/${partName}`}>Buy</Link>
            </button>

            <button className=" w-50 car__item-btn car__btn-details">
                <Link to={`/autoparts/${partName}`}>Details</Link>
            </button>
            </div>
        </div>
        </Col>
    );
};

export default AutoPartItem;

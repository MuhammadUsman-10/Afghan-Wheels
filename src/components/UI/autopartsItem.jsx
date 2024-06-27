import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/autoparts.css";

const AutoPartItem = (props) => {
    const { imgUrl, partName, price } = props.item;

    return (
        <Col lg="4" md="4" sm="6" className="mb-5">
        <div className="part_item">
            <div className="part_img">
            <img src={imgUrl} alt="" className="w-80" />
            </div>

            <div className="part_item-content mt-4">
            <h4 className="section__title text-center">{partName}</h4>
            <h6 className="rent__price text-center mt-">
                AFN {price}.00/-
            </h6>

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

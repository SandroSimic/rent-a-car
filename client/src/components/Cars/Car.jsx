import React from "react";
import carImg from "../../images/car1.jpg";
import { FaStar } from "react-icons/fa";

const Car = () => {
  return (
    <div className="car">
      <div>
        <img src={carImg} alt="cartest" />
      </div>
      <div className="car__text">
        <h3>Toyota BRZ</h3>
        <p>London, 2019, Automatic</p>
        <div className="car__review">
          <div className="car__review__stars">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <span>
            <strong>45 reviews</strong>
          </span>
        </div>
        <div className="car__price">
          <span>$55</span> / day
        </div>
      </div>
    </div>
  );
};

export default Car;

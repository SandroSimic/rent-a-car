import React from "react";
import { FaSearch, FaCar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const CarSearch = () => {
  return (
    <div className="car__search">
      <div className="car__search__input">
        <label htmlFor="searchCar">Search: </label>
        <input type="text" id="searchCar"/>
        <FaCar className="car__search__icon" />
      </div>
      <div className="car__search__input">
        <label htmlFor="searchLocation">Location: </label>
        <input type="text" id="searchLocation"/>
        <FaLocationDot className="car__search__icon" />
      </div>
      <button className="car__search__btn">
        <FaSearch />
      </button>
    </div>
  );
};

export default CarSearch;

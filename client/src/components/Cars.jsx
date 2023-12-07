import React from "react";
import CarSearch from "./Cars/CarSearch";
import Car from "./Cars/Car";

const Cars = () => {
  return (
    <div className="cars">
      <CarSearch />
      <div className="cars__results">
        <p>
          Searching Results: <span>12345 cars</span>{" "}
        </p>
      </div>

      <div className="carsList">
        <Car />
        <Car />
        <Car />
        <Car />
        <Car />
        <Car />
        <Car />
        <Car />
        <Car />
      </div>
    </div>
  );
};

export default Cars;

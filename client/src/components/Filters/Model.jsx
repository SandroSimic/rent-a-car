import React from "react";

const Model = () => {
  return (
    <div className="filter__model">
      <h2>Car model:</h2>
      <select className="filter__model__select">
        <option>Any Car</option>
        <option>Toyota</option>
        <option>Honda</option>
        <option>Ford</option>
        <option>Chevrolet</option>
        <option>BMW</option>
        <option>Mercedes-Benz</option>
        <option>Audi</option>
        <option>Tesla</option>
        <option>Nissan</option>
        <option>Hyundai</option>
      </select>
    </div>
  );
};

export default Model;

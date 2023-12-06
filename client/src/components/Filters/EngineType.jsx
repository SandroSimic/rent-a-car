import React from "react";

const EngineType = () => {
  return (
    <div className="filter__engineType">
      <h2>Engine Type</h2>
      <select className="filter__engineType__select">
        <option>All Types</option>
        <option>Petrol</option>
        <option>Diesel</option>
        <option>Electric</option>
        <option>LPG</option>
        <option>Hybrid</option>
      </select>
    </div>
  );
};

export default EngineType;

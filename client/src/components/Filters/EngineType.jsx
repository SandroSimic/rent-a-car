import React, { useState } from "react";

const EngineType = ({ applyFilters, setSelectedType, selectedType }) => {
  const handleEngineTypeChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedType(selectedOption);

    // Apply filters based on selected engine type
    const filters =
      selectedOption === "All Types" ? {} : { engineType: selectedOption };
    applyFilters(filters);
  };

  return (
    <div className="filter__engineType">
      <h2>Engine Type</h2>
      <select
        className="filter__engineType__select"
        value={selectedType}
        onChange={handleEngineTypeChange}
      >
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

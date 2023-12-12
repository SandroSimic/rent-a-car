import React, { useState } from "react";

const Transmission = ({ applyFilters, selectedOption, setSelectedOption }) => {
  const handleTransmissionChange = (e) => {
    const { name } = e.target;
    setSelectedOption(name);

    // Apply filters based on selected transmission type
    const filters = {
      transmission: name,
    };
    applyFilters(filters);
  };

  return (
    <div className="filter__transmission">
      <h2>Transmission</h2>
      <div className="filter__transmission__items">
        <input
          type="checkbox"
          name="automatic"
          id="automatic"
          checked={selectedOption === "automatic"}
          onChange={handleTransmissionChange}
        />
        <label htmlFor="automatic">Automatic</label>
      </div>

      <div className="filter__transmission__items">
        <input
          type="checkbox"
          name="manual"
          id="manual"
          checked={selectedOption === "manual"}
          onChange={handleTransmissionChange}
        />
        <label htmlFor="manual">Manual</label>
      </div>
    </div>
  );
};

export default Transmission;

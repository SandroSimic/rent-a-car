import React, { useState } from "react";

const Model = ({ applyFilters, selectedModel, setSelectedModel }) => {
  const handleModelChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedModel(selectedValue);

    const filters = {
      model: selectedValue === "Any Car" ? "" : selectedValue,
    };
    applyFilters(filters);
  };
  return (
    <div className="filter__model">
      <h2>Car model:</h2>
      <select
        className="filter__model__select"
        value={selectedModel}
        onChange={handleModelChange}
      >
        <option>Any Car</option>
        <option>Toyota</option>
        <option>Honda</option>
        <option>Ford</option>
        <option>Chevrolet</option>
        <option>BMW</option>
        <option>Mercedes</option>
        <option>Audi</option>
        <option>Tesla</option>
        <option>Nissan</option>
        <option>Hyundai</option>
      </select>
    </div>
  );
};

export default Model;

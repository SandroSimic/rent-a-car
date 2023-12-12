import React from "react";

const ClearFilters = ({ clearAllFilters }) => {
  const handleClearFilters = () => {
    clearAllFilters();
  };

  return (
    <div className="filter__clearFilter">
      <button onClick={handleClearFilters}>Clear Filters</button>
    </div>
  );
};

export default ClearFilters;

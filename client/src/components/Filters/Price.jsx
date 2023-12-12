/* eslint-disable react/prop-types */
import { useState } from "react";

const Price = ({ applyFilters, minPrice, maxPrice, setMinPrice, setMaxPrice }) => {
  const handlePriceChange = () => {
    const filters = {
      priceFrom: minPrice,
      priceTo: maxPrice,
    };
    applyFilters(filters);
  };

  return (
    <div className="filter__price">
      <h2>Price: </h2>
      <div className="filter__price__range">
        <input
          type="number"
          placeholder="from"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          onBlur={handlePriceChange}
        />
        <div className="filter__price__range--line" />
        <input
          type="number"
          placeholder="to"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          onBlur={handlePriceChange}
        />
      </div>
    </div>
  );
};

export default Price;

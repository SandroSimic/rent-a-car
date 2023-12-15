/* eslint-disable react/prop-types */
import { useState } from "react";
import BodyStyle from "./Filters/BodyStyle";
import ClearFilters from "./Filters/ClearFilters";
import EngineType from "./Filters/EngineType";
import Model from "./Filters/Model";
import Price from "./Filters/Price";
import Ratings from "./Filters/Ratings";
import Transmission from "./Filters/Transmission";

const Filters = ({ applyFilters }) => {
  const [filters, setFilters] = useState({});
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const [selectedModel, setSelectedModel] = useState("Any Car");
  const [selectedBodyStyle, setSelectedBodyStyle] = useState(null);
  const [selectedTransmission, setSelectedTransmission] = useState(null);
  const [selectedEngine, setSelectedEngine] = useState("All Types");

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const clearAllFilters = () => {
    setFilters({});
    setMinPrice("");
    setMaxPrice("");
    setRating(0);
    setSelectedBodyStyle(null);
    setSelectedModel("Any Car");
    setSelectedTransmission(null);
    setSelectedEngine("All Types");
    applyFilters();
  };

  const handleApplyFilters = () => {
    applyFilters(filters);
  };

  return (
    <div className="filter">
      <ClearFilters clearAllFilters={clearAllFilters} />
      <div>
        <button className="filter__applyBtn" onClick={handleApplyFilters}>
          <p>Apply</p>
        </button>
      </div>
      <Price
        applyFilters={handleFilterChange}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />
      <Ratings
        applyFilters={handleFilterChange}
        rating={rating}
        setRating={setRating}
      />
      <Model
        applyFilters={handleFilterChange}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
      <BodyStyle
        applyFilters={handleFilterChange}
        selectedItem={selectedBodyStyle}
        setSelectedItem={setSelectedBodyStyle}
      />
      <Transmission
        applyFilters={handleFilterChange}
        selectedOption={selectedTransmission}
        setSelectedOption={setSelectedTransmission}
      />
      <EngineType
        applyFilters={handleFilterChange}
        selectedType={selectedEngine}
        setSelectedType={setSelectedEngine}
      />
    </div>
  );
};

export default Filters;

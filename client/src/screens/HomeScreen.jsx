import { useState } from "react";
import Cars from "../components/Cars/Cars";
import Filters from "../components/Filters";
import Map from "../components/Map";

const HomeScreen = () => {
  const [appliedFilters, setAppliedFilters] = useState({});

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
  };

  return (
    <div className="home">
      <Filters applyFilters={handleApplyFilters} />
      <Cars filters={appliedFilters} />
      <Map />
    </div>
  );
};

export default HomeScreen;

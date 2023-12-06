import BodyStyle from "./Filters/BodyStyle";
import ClearFilters from "./Filters/ClearFilters";
import EngineType from "./Filters/EngineType";
import Model from "./Filters/Model";
import Price from "./Filters/Price";
import Ratings from "./Filters/Ratings";
import Transmission from "./Filters/Transmission";

const Filters = () => {
  return (
    <div className="filter">
      <ClearFilters />
      <Price />
      <Ratings />
      <Model />
      <BodyStyle />
      <Transmission />
      <EngineType />
    </div>
  );
};

export default Filters;

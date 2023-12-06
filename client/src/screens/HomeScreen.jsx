import Cars from "../components/Cars";
import Filters from "../components/Filters";
import Map from "../components/Map";

const HomeScreen = () => {
  return (
    <div className="home">
      <Filters />
      <Cars />
      <Map />
    </div>
  );
};

export default HomeScreen;

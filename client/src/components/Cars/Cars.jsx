/* eslint-disable react/prop-types */
import CarSearch from "./CarSearch";
import Car from "./Car";
import { useCars } from "./useCars";
import Spinner from "../../UI/Spinner";
import { useState } from "react";

const Cars = ({ filters }) => {
  const { data, isLoading } = useCars(filters);
  const cars = data?.cars || [];
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="cars">
      <CarSearch handleSearchChange={handleSearchChange} />
      <div className="cars__results">
        <p>
          Searching Results: <span>{filteredCars.length} cars</span>{" "}
        </p>
      </div>

      <div className="carsList">
        {filteredCars.map((car) => (
          <Car
            carId={car._id}
            key={car._id}
            name={car.name}
            image={car.image}
            transmission={car.transmission}
            numRatings={car.numRatings}
            price={car.price}
            year={car.year}
            ratingsAverage={car.ratingsAverage}
          />
        ))}
      </div>
    </div>
  );
};

export default Cars;

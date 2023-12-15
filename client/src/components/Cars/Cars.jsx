/* eslint-disable react/prop-types */
import CarSearch from "./CarSearch";
import Car from "./Car";
import { useCars } from "./useCars";
import Spinner from "../../UI/Spinner";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Cars = ({ filters }) => {
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");
  const { data, isLoading } = useCars({
    ...filters,
    keyword: keyword ? keyword : "",
  });

  const cars = data?.cars || [];

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="cars">
      <CarSearch setKeyword={setKeyword} keyword={keyword}/>
      <div className="cars__results">
        <p>
          Searching Results: <span>{cars.length} cars</span>{" "}
        </p>
      </div>

      <div className="carsList">
        {cars.map((car) => (
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

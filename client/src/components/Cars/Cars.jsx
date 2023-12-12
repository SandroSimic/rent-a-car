import CarSearch from "./CarSearch";
import Car from "./Car";
import { useCars } from "./useCars";
import Spinner from "../../UI/Spinner";

const Cars = () => {
  const { data, isLoading } = useCars();
  const cars = data?.cars || [];

  console.log(cars)

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="cars">
      <CarSearch />
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

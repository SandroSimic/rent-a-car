/* eslint-disable react/prop-types */
import CarSearch from "./CarSearch";
import Car from "./Car";
import Pagination from "../Pagination";
import Spinner from "../../UI/Spinner";

const Cars = ({
  allCars,
  isLoading,
  fetchedData,
  currentPage,
  keyword,
  handlePageChange,
  setKeyword,
}) => {
  const cars = fetchedData ? fetchedData.cars || [] : [];
  const totalPages = fetchedData ? fetchedData.pages : 1;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="cars">
      <CarSearch setKeyword={setKeyword} keyword={keyword} />
      {cars.length !== 0 && (
        <div className="cars__results">
          <p>
            Searching Results: <span>{allCars.cars.length} cars</span>{" "}
          </p>
        </div>
      )}

      <div className="carsList">
        {cars.length !== 0 ? (
          cars.map((car) => (
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
              owner={car.owner}
            />
          ))
        ) : (
          <p className="error-message">No Cars Found</p>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Cars;

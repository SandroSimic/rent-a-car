/* eslint-disable react/prop-types */
import CarSearch from "./CarSearch";
import Car from "./Car";
import { useCars } from "./useCars";
import Spinner from "../../UI/Spinner";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";

const Cars = ({ filters }) => {
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");
  const [fetchedData, setFetchedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, refetch } = useCars({
    ...filters,
    keyword: keyword,
    pageNumber: currentPage,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await refetch();
      if (result && result.data) {
        setFetchedData(result.data);
      }
    };

    fetchData();
  }, [filters, keyword, currentPage, refetch]);

  useEffect(() => {
    setCurrentPage(1); // Reset currentPage to 1 whenever keyword or filters change
  }, [keyword, filters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <Spinner />;
  }

  const cars = fetchedData ? fetchedData.cars || [] : [];
  const totalPages = fetchedData ? fetchedData.pages : 1;

  return (
    <div className="cars">
      <CarSearch setKeyword={setKeyword} keyword={keyword} />
      {cars.length !== 0 && (
        <div className="cars__results">
          <p>
            Searching Results: <span>{cars.length} cars</span>{" "}
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

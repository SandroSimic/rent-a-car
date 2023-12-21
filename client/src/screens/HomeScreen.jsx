import { useEffect, useState } from "react";
import Cars from "../components/Cars/Cars";
import Filters from "../components/Filters";
import Map from "../components/Map";
import { useCars } from "../components/Cars/useCars";

const HomeScreen = () => {
  const [appliedFilters, setAppliedFilters] = useState({});
  const [keyword, setKeyword] = useState("");
  const [fetchedData, setFetchedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, refetch } = useCars({
    ...appliedFilters,
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
  }, [appliedFilters, keyword, currentPage, refetch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, appliedFilters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="home">
      <Filters applyFilters={setAppliedFilters} />
      <Cars
        isLoading={isLoading}
        fetchedData={fetchedData}
        currentPage={currentPage}
        keyword={keyword}
        handlePageChange={handlePageChange}
        setKeyword={setKeyword}
      />
      <Map allCars={fetchedData?.cars} />
    </div>
  );
};

export default HomeScreen;

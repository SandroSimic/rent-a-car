import React from "react";
import StarRating from "./StarRating";

const Ratings = ({ applyFilters, rating, setRating }) => {
  return (
    <div className="filter__rating">
      <h2>Rating not less than:</h2>
      <div>
        <StarRating
          applyFilters={applyFilters}
          rating={rating}
          setRating={setRating}
        />
      </div>
    </div>
  );
};

export default Ratings;

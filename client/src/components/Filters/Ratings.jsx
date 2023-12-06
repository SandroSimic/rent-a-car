import React from "react";
import StarRating from "./StarRating";

const Ratings = () => {
  return (
    <div className="filter__rating">
      <h2>Rating not less than:</h2>
      <div>
        <StarRating />
      </div>
    </div>
  );
};

export default Ratings;

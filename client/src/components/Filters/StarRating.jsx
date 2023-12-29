/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ applyFilters, rating, setRating }) => {
  const [hover, setHover] = useState(0);

  const handleRatingChange = (selectedRating) => {
    const filters = {
      ratingsAverage: selectedRating,
    };
    applyFilters(filters);
  };

  return (
    <div className="filterStars">
    {[...Array(5)].map((star, index) => {
      const currentRating = index + 1;
      return (
        <label key={index}>
          <input
            type="radio"
            name="rating"
            value={currentRating}
            onClick={() => {
              setRating(currentRating);
              handleRatingChange(currentRating);
            }}
          />
          <FaStar
            className="star"
            size={25}
            color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            onMouseEnter={() => setHover(currentRating)}
            onMouseLeave={() => setHover(null)}
          />
        </label>
      );
    })}
  </div>
  );
};

export default StarRating;

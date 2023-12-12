/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import StarRating from "../../UI/StarRating";
const Car = ({
  carId,
  image,
  name,
  transmission,
  numRatings,
  price,
  year,
  ratingsAverage,
}) => {
  return (
    <Link className="car" to={`/car/${carId}`}>
      <div>
        <img src={image} alt="cartest9" />
      </div>
      <div className="car__text">
        <h3>{name}</h3>
        <p>
          London, {year}, {transmission}
        </p>
        <div className="car__review">
          <div className="car__review__stars">
            <StarRating ratingsAverage={ratingsAverage} />
          </div>
          <span>
            <strong>{numRatings} ratings</strong>
          </span>
        </div>
        <div className="car__price">
          <span>${price}</span> / day
        </div>
      </div>
    </Link>
  );
};

export default Car;

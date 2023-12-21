/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import StarRating from "../../UI/StarRating";
import { useEffect, useState } from "react";
import { fetchCountryName } from "../../utils/fetchCityName";
const Car = ({
  carId,
  image,
  name,
  transmission,
  numRatings,
  price,
  year,
  ratingsAverage,
  owner,
  lat,
  lng,
}) => {
  const [country, setCountry] = useState(""); // State for country

  useEffect(() => {
    if (lat && lng) {
      fetchCountryName(lat, lng) // Fetch country based on lat/lng
        .then((countryName) => {
          setCountry(countryName || ""); // Set the country name in state
        })
        .catch((error) => {
          console.error("Error fetching country:", error);
        });
    }
  }, [lat, lng]);

  return (
    <Link className="car" to={`/car/${carId}`}>
      <div className="car__image">
        <img src={image} alt="Car" />
      </div>
      <div className="car__text">
        <h3>{name}</h3>
        <p>
          {country}, {year}, {transmission}
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
          <div>
            <span>${price}</span> / day
          </div>
          <p>{owner && owner.username}</p>
        </div>
      </div>
    </Link>
  );
};

export default Car;

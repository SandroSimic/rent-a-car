import { useCar } from "./useCar";
import { useUser } from "../Users/useUser";
import Spinner from "../../UI/Spinner";
import { FaArrowLeft } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import StarRating from "../../UI/StarRating";
import { useEffect, useState } from "react";
import { useDeleteCar } from "./useDeleteCar";
import { fetchCityName } from "../../utils/fetchCityName";
import Review from "../Reviews/Review";
import AddReview from "../Reviews/AddReview";

const CarDetails = () => {
  const { car, isLoading, refetch } = useCar();
  const { user } = useUser();
  const navigate = useNavigate();
  const { deleteCarQuery, isDeleting } = useDeleteCar();
  const [city, setCity] = useState("");
  function handleDelete() {
    if (window.confirm("Are you sure to delete this car?")) {
      deleteCarQuery(car._id);
    }
  }
  console.log(car)
  useEffect(() => {
    if (car?.lat && car?.lng) {
      fetchCityName(car?.lat, car?.lng)
        .then((city) => {
          setCity(city);
        })
        .catch((error) => {
          console.error("Error fetching city:", error);
        });
    }
  }, [car?.lat, car?.lng]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="carDetails">
      <div className="carDetails__info">
        <div className="carDetails__info__mainInfo">
          <span
            className="carDetails__info__mainInfo__back"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
            <span>Back</span>
          </span>
          <h1 className="carDetails__info__mainInfo__name">
            {car.name} <span>({car.carModel})</span>
          </h1>
          <div className="carDetails__info__mainInfo__location">
            <span>
              <FaLocationDot />
            </span>{" "}
            {city}
          </div>
          <div className="carDetails__info__mainInfo__averageRating">
            <p>Average Rating:</p>
            <StarRating ratingsAverage={car.ratingsAverage} />
            <span>({car.numRatings})</span>
          </div>
        </div>
        <div className="carDetails__subInfo">
          <div className="carDetails__subInfo__info">
            <div className="carDetails__subInfo__info__price">
              <p>Price: </p>
              <h3>
                <span>{car.price}$</span> / Day
              </h3>
            </div>
            <h3 className="carDetails__subInfo__info__owner">
              Owner:{" "}
              <Link to={`/user/${car?.owner?._id}`}>
                <span>{car?.owner?.username}</span>
              </Link>
            </h3>
            {user?._id === car?.owner._id ? (
              <div className="carDetails__actions">
                <button
                  className="carDetails__actions--delete"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  <MdDelete />
                </button>
                <Link
                  className="carDetails__actions--edit"
                  to={`/car/edit/${car._id}`}
                >
                  <MdEdit />
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className="carDetails__extraDetails">
        <div className="carDetails__extraDetails__image">
          <img src={car.image} />
        </div>
        <div className="carDetails__extraDetails__info">
          <div>
            <h3>Car Model</h3>
            <p>{car.carModel}</p>
          </div>
          <div>
            <h3>Body Style</h3>
            <p>{car.bodyStyle}</p>
          </div>
          <div>
            <h3>Engine Type</h3>
            <p>{car.engineType}</p>
          </div>
          <div>
            <h3>Transmission</h3>
            <p>{car.transmission}</p>
          </div>
          <div>
            <h3>description</h3>
            <p>{car.description}</p>
          </div>
          <div>
            <h3>Year</h3>
            <p>{car.year}</p>
          </div>
        </div>
      </div>
      <h1 className="reviews">Reviews</h1>
      {user?._id === car.owner._id ? "" : <AddReview carId={car._id} />}
      {car.reviews.map((review) => (
        <Review
          key={review._id}
          image={review.image}
          username={review.username}
          comment={review.comment}
          rating={review.rating}
        />
      ))}
    </div>
  );
};

export default CarDetails;

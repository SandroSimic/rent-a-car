import { useCar } from "./useCar";
import Spinner from "../../UI/Spinner";
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import StarRating from "../../UI/StarRating";

const CarDetails = () => {
  const { car, isLoading } = useCar();
  const navigate = useNavigate();

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
            London
          </div>
          <div className="carDetails__info__mainInfo__averageRating">
            <p>Average Rating:</p>
            <StarRating ratingsAverage={car.ratingsAverage} />
            <span>({car.ratingsAverage})</span>
          </div>
        </div>
        <div className="carDetails__subInfo">
          <div className="carDetails__subInfo__favorite">
            <FaHeart />
            <span>To favorites</span>
          </div>
          <div className="carDetails__subInfo__price">
            <p>Price: </p>
            <h3>
              <span>{car.price}$</span> / Day
            </h3>
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
    </div>
  );
};

export default CarDetails;

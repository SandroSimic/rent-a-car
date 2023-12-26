/* eslint-disable react/prop-types */
import StarRating from "../../UI/StarRating";

const Review = ({ image, username, comment, rating }) => {
  return (
    <div className="reviews">
      <div className="review">
        <div className="review__image">
          <img src={image} alt={username} />
        </div>
        <div className="review__text">
          <p>{comment}</p>
          <span>
            <StarRating ratingsAverage={rating} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Review;

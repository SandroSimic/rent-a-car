import StarRating from "../../UI/StarRating";

const Review = () => {
  return (
    <div className="reviews">
      <h1>Reviews</h1>

      <div className="review">
        <div className="review__image">
          <img src="dummyImage" />
        </div>
        <div className="review__text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
            diam tellus.
          </p>
          <StarRating ratingsAverage={4} />
        </div>
      </div>
    </div>
  );
};

export default Review;

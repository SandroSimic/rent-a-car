import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ ratingsAverage }) => {
  const renderStars = () => {
    const stars = [];
    const roundedRating = Math.round(ratingsAverage);
    const isHalfStar = roundedRating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < roundedRating) {
        stars.push(<FaStar key={i} />);
      } else if (isHalfStar && i === roundedRating) {
        stars.push(<FaStarHalfAlt key={i} />);
      } else {
        stars.push(<FaStar key={i} style={{ opacity: 0.3 }} />);
      }
    }
    return stars;
  };

  return <div>{renderStars()}</div>;
};

export default StarRating;

/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaSearch, FaCar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const CarSearch = ({ setKeyword, keyword }) => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  const submitHandler = () => {
    if (searchKeyword.trim() === "") {
      setKeyword("");
    } else {
      setKeyword(searchKeyword.trim());
    }
    navigate("/");
  };

  return (
    <div className="car__search">
      <div className="car__search__input">
        <label htmlFor="searchCar">Search: </label>
        <input
          type="text"
          id="searchCar"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <FaCar className="car__search__icon" />
      </div>
      <div className="car__search__input">
        <label htmlFor="searchLocation">Location: </label>
        <input type="text" id="searchLocation" />
        <FaLocationDot className="car__search__icon" />
      </div>
      <button
        className="car__search__btn"
        type="submit"
        onClick={submitHandler}
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default CarSearch;

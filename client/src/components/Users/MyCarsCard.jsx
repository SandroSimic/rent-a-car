/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const MyCarsCard = ({ id, image, name, price, country }) => {
  return (
    <Link className="myCarsCard" to={`/car/${id}`}>
      <div className="myCarsCard__image">
        <img src={image} alt={name} />
      </div>
      <div className="myCarsCard__card">
        <h3>{name}</h3>
        <div className="myCarsCard__card__info">
          <p className="myCarsCard__card__info__perDay">
            <span>${price}</span>/Per Day
          </p>
          <p className="myCarsCard__card__info__country">{country}</p>
        </div>
      </div>
    </Link>
  );
};

export default MyCarsCard;

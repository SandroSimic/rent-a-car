import React, { useState } from "react";
import coupeCarImg from "./../../images/coupe.svg";
import jeepCarImg from "./../../images/jeep.svg";
import sedanCarImg from "./../../images/sedanCar.svg";
import sportCar from "./../../images/sportCar.svg";

const BodyStyle = ({ applyFilters, selectedItem, setSelectedItem }) => {
  const bodyStyleItems = [
    { id: "coupe", label: "Coupe", image: coupeCarImg },
    { id: "jeep", label: "Jeep", image: jeepCarImg },
    { id: "sedan", label: "Sedan", image: sedanCarImg },
    { id: "sport", label: "Sport", image: sportCar },
  ];

  const handleItemClick = (id) => {
    if (selectedItem === id) {
      setSelectedItem("");
      applyFilters({ bodyStyle: "" });
    } else {
      setSelectedItem(id);
      applyFilters({ bodyStyle: id });
    }
  };

  return (
    <>
      <div className="filter__bodyStyle">
        <h2>Body Style:</h2>
        <div className="filter__bodyStyle__grid">
          {bodyStyleItems.map((item) => (
            <div
              key={item.id}
              className={`filter__bodyStyle__grid__item ${
                selectedItem === item.id ? "active" : ""
              }`}
              onClick={() => handleItemClick(item.id)}
            >
              <img src={item.image} alt={item.label} />
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BodyStyle;

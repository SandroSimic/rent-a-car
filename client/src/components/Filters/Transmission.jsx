import React from "react";

const Transmission = () => {
  return (
    <div className="filter__transmission">

    <h2>Transmission</h2>
      <div className="filter__transmission__items">
        <input type="checkbox" name="automatic" id="automatic" />
        <label htmlFor="automatic">Automatic</label>
      </div>

      <div className="filter__transmission__items">
        <input type="checkbox" name="manual" id="manual" />
        <label htmlFor="manual">Manual</label>
      </div>
    </div>
  );
};

export default Transmission;

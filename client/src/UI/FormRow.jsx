import React from "react";

const FormRow = ({ label, children, error }) => {
  return (
    <div className="addCarForm__input">
      <label>{label}</label>
      {children}
      {error && <p>{error}</p>}
    </div>
  );
};

export default FormRow;

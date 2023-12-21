import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const FormRow = ({ label, children, error, tooltipId, tooltipContent }) => {
  return (
    <div className="addCarForm__input">
      <label data-tooltip-id={tooltipId} data-tooltip-content={tooltipContent}>
        {label}
      </label>
      {children}
      {error && <p>{error}</p>}
      <Tooltip
        id="my-tooltip"
        style={{
          backgroundColor: "var(--color-primary)",
          color: "white",
          fontSize: "1.3rem",
          borderRadius: ".5rem",
          transition: ".4s all"
        }}
      />
    </div>
  );
};

export default FormRow;

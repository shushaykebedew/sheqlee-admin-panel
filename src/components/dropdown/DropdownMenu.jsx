import React from "react";
import PropTypes from "prop-types";
import classes from "./dropdownmenu.module.css";

const Dropdown = ({ type, selected, onChange }) => {
  const getOptions = () => {
    if (type === "year") {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 50 }, (_, i) => currentYear - i); // Past 50 years
    } else if (type === "month") {
      return [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
    }
    return [];
  };

  return (
    <div className={classes.dropdownContainer}>
      <select
        className={classes.dropdown}
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {getOptions().map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className={classes.icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18.085"
          height="10.178"
          viewBox="0 0 22.085 14.178"
        >
          <path
            d="M11.429,11.76l7.907,7.889,7.907-7.889,2.429,2.429L19.335,24.524,9,14.189Z"
            transform="translate(-8.293 -11.053)"
            fill="#fff"
            stroke="#fff"
            strokeWidth="1"
          />
        </svg>
      </span>
    </div>
  );
};

Dropdown.propTypes = {
  type: PropTypes.oneOf(["year", "month"]).isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  selected: "",
};

export default Dropdown;

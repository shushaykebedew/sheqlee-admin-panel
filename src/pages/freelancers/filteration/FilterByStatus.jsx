import React, { useState, useContext } from "react";
import { PolygonDown, PolygonUp } from "../../../SvgIcons";
import classes from "./FilterByStatus.module.css";

import { FreelancersContext } from "../Freelancers";

function FilterByStatus() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Status");
  const { onFilterChange } = useContext(FreelancersContext);

  const options = [
    { value: "", label: "Status" },
    { value: "all-status", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "deleted", label: "Deleted" },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    onFilterChange(`status:${option.value}`);
    console.log(`status:${option.value}`);
    setIsDropdownOpen(false);
  };

  return (
    <div className={classes.container}>
      {/* Backdrop */}
      {isDropdownOpen && (
        <div
          className={classes.backdrop}
          onClick={() => setIsDropdownOpen(false)}
        />
      )}

      {/* Dropdown */}
      <div className={classes.dropdown}>
        <div
          className={`${classes.control} ${
            isDropdownOpen ? classes.active : ""
          }`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{selectedOption}</span>
          <PolygonDown className={classes.iconDown} />
        </div>

        {isDropdownOpen && (
          <ul className={classes.menu}>
            {options.map((option, index) => (
              <li
                key={option.value}
                className={classes.option}
                style={{
                  borderBottom:
                    index === options.length - 1
                      ? "none"
                      : index === 0
                      ? "1px solid #B4B4B4"
                      : "1px solid #b4b4b49d",

                  marginLeft: index !== 0 ? "1rem" : "0",
                  paddingLeft: index === 0 ? "1rem" : "0",
                }}
                onClick={() => handleOptionClick(option)}
              >
                <span> {option.label}</span>
                {index === 0 && (
                  <PolygonUp
                    className={classes.iconUp}
                    style={{ width: "1.5rem", height: "1.5rem" }}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FilterByStatus;

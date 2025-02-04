import React, { useState, useEffect } from "react";
import { PolygonDown, PolygonUp } from "../../../../SvgIcons";
import classes from "./FilterVersion.module.css";

function FilterVersion({ currentIteration, uniqueVersions, onFilterChange }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(`v${currentIteration}`);

  useEffect(() => {
    // Update the selected option if the current iteration changes
    setSelectedOption(`v${currentIteration}`);
  }, [currentIteration]);

  const options = uniqueVersions.map((version) => ({
    value: version,
    label: `v${version}`,
  }));

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    setIsDropdownOpen(false);

    // Notify the parent of the selected iteration
    onFilterChange(option.value);
  };

  return (
    <div className={classes.container}>
      {isDropdownOpen && (
        <div
          className={classes.backdrop}
          onClick={() => setIsDropdownOpen(false)}
        />
      )}

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

                  paddingLeft: "1rem",
                }}
                onClick={() => handleOptionClick(option)}
              >
                <span>{option.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FilterVersion;

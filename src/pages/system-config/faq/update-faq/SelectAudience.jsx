import React, { useState, useEffect } from "react";
import { PolygonDown, PolygonUp } from "../../../../SvgIcons";
import classes from "./selectaudience.module.css";

function SelectAudience({ onChange, selectedAudience }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Audience");

  const options = [
    { value: "", label: "Audience" },
    { value: "all-audience", label: "All Audience" },
    { value: "freelancers", label: "Freelancers" },
    { value: "companies", label: "Companies" },
  ];

  useEffect(() => {
    const matchingOption = options.find(
      (option) => option.value === selectedAudience?.toLowerCase()
    );
    setSelectedOption(matchingOption ? matchingOption.label : "Audience");
  }, [selectedAudience]);

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    onChange(option.value);
    setIsDropdownOpen(false);
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
                onClick={() => handleOptionClick(option)}
              >
                <span>{option.label}</span>
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

export default SelectAudience;

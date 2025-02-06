import React, { useState, useContext } from "react";

import { PolygonDown, PolygonUp } from "../../../SvgIcons";
import classes from "./FilterByTags.module.css";
import { JobsContext } from "../JobPosts";

function FilterByTags() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Tags");

  const { onFilterChange } = useContext(JobsContext);

  const options = [
    { value: "", label: "Tags" },
    { value: "all-tags", label: "All" },
    { value: "python", label: "Python" },
    { value: "react", label: "React" },
    { value: "flutter", label: "Flutter" },
    { value: "node.js", label: "Node.JS" },
    { value: "mysql", label: "MySQL" },
  ];

  const handleOptionClick = (option) => {
    if (option.value === "" || option.value === "all-tags") {
      setSelectedOption("Tags");
    } else {
      setSelectedOption(option.label);
    }

    onFilterChange(`tags:${option.value}`);
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
          <span className={classes.label}>{selectedOption}</span>
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
                    style={{ width: "1.3rem", height: "1.3rem" }}
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

export default FilterByTags;

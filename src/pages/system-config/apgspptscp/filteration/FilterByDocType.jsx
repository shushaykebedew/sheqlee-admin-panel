import React, { useContext, useState } from "react";
import { PolygonDown, PolygonUp } from "../../../../SvgIcons";
import classes from "./FilterByDocType.module.css";
import { APGSPPTSCP_Context } from "../APGSPPTSCP";
import { dummyAPGSPPTSCP } from "../data";
function FilterByDocType() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Doc Type");

  const { onFilterChange } = useContext(APGSPPTSCP_Context);

  // Extract unique pageTitle options dynamically
  const uniquePageTitles = Array.from(
    new Set(dummyAPGSPPTSCP.map((page) => page.pageTitle))
  );

  const options = [
    { value: "", label: "Doc Type" },
    { value: "all-options", label: "All" },
    ...uniquePageTitles.map((pageTitle) => ({
      value: pageTitle,
      label: pageTitle,
    })),
  ];

  const handleOptionClick = (option) => {
    if (option.value === "" || option.value === "all-options") {
      setSelectedOption("Doc Type");
    } else {
      setSelectedOption(option.label);
    }
    const filterValue = option.value === "all-options" ? "" : option.value;
    onFilterChange(filterValue);
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

export default FilterByDocType;

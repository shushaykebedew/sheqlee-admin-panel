import React, { useContext, useState } from "react";
import { PolygonDown, PolygonUp } from "../../../SvgIcons";
import classes from "./FilterByRole.module.css";

import { UsersContext } from "../Users";

function FilterByRole() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Role");

  const { onFilterChange } = useContext(UsersContext);

  const options = [
    { value: "", label: "Role" },
    { value: "all-roles", label: "All" },
    { value: "superadmin", label: "Super admin" },
    { value: "admin", label: "Admin" },
    { value: "sales", label: "Sales" },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    onFilterChange(`role:${option.value}`);
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

export default FilterByRole;

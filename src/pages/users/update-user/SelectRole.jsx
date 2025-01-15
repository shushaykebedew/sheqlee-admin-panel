import React, { useContext, useState, useEffect } from "react";
import { PolygonDown, PolygonUp } from "../../../SvgIcons";
import classes from "./selectrole.module.css";

function SelectRole({ onChange, selectedRole }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("User role");

  const options = [
    { value: "", label: "User role" },
    { value: "superadmin", label: "Super admin" },
    { value: "admin", label: "Admin" },
    { value: "sales", label: "Sales" },
  ];

  useEffect(() => {
    const matchingOption = options.find(
      (option) => option.value === selectedRole.toLowerCase()
    );
    setSelectedOption(matchingOption ? matchingOption.label : "User role");
  }, [selectedRole]);

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

export default SelectRole;

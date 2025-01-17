import React, { useState } from "react";
import { PolygonDown, RemoveIconCircled } from "../../../SvgIcons";
import classes from "./addcats.module.css";

function AddCats({ onChange }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCats, setSelectedCats] = useState([]);

  const options = [
    { value: "backend-development", label: "Backend Development" },
    { value: "cloud-computing", label: "Cloud Computing" },
    {
      value: "cross-platform-mobile-development",
      label: "Cross-Platform Mobile Development",
    },
    { value: "database-development", label: "Database Development" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "ui-ux-design", label: "UI/UX Design" },
    {
      value: "embedded-systems-development",
      label: "Embedded Systems Development",
    },
    { value: "frontend-development", label: "Frontend Development" },
  ];

  const handleOptionClick = (option) => {
    if (!selectedCats.find((cat) => cat.value === option.value)) {
      const newCats = [...selectedCats, option];
      setSelectedCats(newCats);
      onChange(newCats); // Pass selected Cats back to parent
    }
    setIsDropdownOpen(false);
  };

  const handleRemoveCat = (catToRemove) => {
    const newCats = selectedCats.filter(
      (cat) => cat.value !== catToRemove.value
    );
    setSelectedCats(newCats);
    onChange(newCats);
  };

  const hasCats = selectedCats.length > 0;

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
          className={`${classes.control} 
                       ${isDropdownOpen ? classes.active : ""} 
                       ${hasCats ? classes["has-cats"] : ""}`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className={classes.label}>
            {hasCats ? "Add More Categories" : "Add Categories"}
          </span>
          <PolygonDown className={classes.iconDown} />
        </div>

        {isDropdownOpen && (
          <ul className={classes.menu}>
            {options.map((option, index) => (
              <li
                key={option.value}
                className={classes.option}
                onClick={() => handleOptionClick(option)}
                style={{
                  borderBottom:
                    index === options.length - 1
                      ? "none"
                      : index === 0
                      ? "1px solid #B4B4B4"
                      : "1px solid #b4b4b49d",

                  paddingLeft: "1rem",
                }}
              >
                <span>{option.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected Cats */}
      <div className={classes.selectedCats}>
        {selectedCats.map((cat) => (
          <div key={cat.value} className={classes.cat}>
            <span>{cat.label}</span>
            <button
              className={classes.removeIcon}
              onClick={() => handleRemoveCat(cat)}
            >
              <RemoveIconCircled />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddCats;

import React, { useState } from "react";
import { PolygonDown, RemoveIconCircled } from "../../../SvgIcons";
import classes from "./addtags.module.css";

function AddTags({ onChange }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

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
    if (!selectedTags.find((tag) => tag.value === option.value)) {
      const newTags = [...selectedTags, option];
      setSelectedTags(newTags);
      onChange(newTags); // Pass selected tags back to parent
    }
    setIsDropdownOpen(false);
  };

  const handleRemoveTag = (tagToRemove) => {
    const newTags = selectedTags.filter(
      (tag) => tag.value !== tagToRemove.value
    );
    setSelectedTags(newTags);
    onChange(newTags); // Pass selected tags back to parent
  };
  const hasTags = selectedTags.length > 0;
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
              ${hasTags ? classes["has-tags"] : ""}`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className={`${classes.label}`}>
            {hasTags ? "Add More Tags" : "Add Tags"}
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

      {/* Selected Tags */}
      <div className={classes.selectedTags}>
        {selectedTags.map((tag) => (
          <div key={tag.value} className={classes.tag}>
            <span>{tag.label}</span>
            <button
              className={classes.removeIcon}
              onClick={() => handleRemoveTag(tag)}
            >
              <RemoveIconCircled />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddTags;

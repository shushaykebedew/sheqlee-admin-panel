import React from "react";
import PropTypes from "prop-types";
import classes from "./uploadbutton.module.css";

function UploadButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      className={`${classes.button} ${className} ${
        disabled ? classes.disabled : ""
      } ${disabled ? "" : children ? classes.valid : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

UploadButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default UploadButton;

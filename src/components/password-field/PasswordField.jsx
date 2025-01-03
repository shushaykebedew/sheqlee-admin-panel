import { Eye, EyeSlash } from "../../SvgIcons";

import classes from "./passwordfield.module.css";

function PasswordField({
  value,
  onChange,
  error,
  placeholder,
  showEyeIcon,
  showPassword,
  togglePasswordVisibility,
}) {
  return (
    <div className={classes["password-field"]}>
      <div className={classes["password-field-form"]}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {showEyeIcon && (
          <span
            className={`${classes["show-eye-icon"]} ${
              showPassword ? classes.eye : classes.eyeslash
            }`}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <Eye /> : <EyeSlash />}
          </span>
        )}
      </div>
      {error && <p className={classes["error-message"]}>{error}</p>}
    </div>
  );
}

export default PasswordField;

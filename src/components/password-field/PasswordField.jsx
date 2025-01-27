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
  const getMaskedPassword = () => value.replace(/./g, "*");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (!showPassword) {
      // Masked mode: Only allow adding or removing from the end of the string
      if (inputValue.length < value.length) {
        // Handle deletion
        onChange({ target: { value: value.slice(0, inputValue.length) } });
      } else {
        // Handle addition
        const addedChar = inputValue[inputValue.length - 1];
        onChange({ target: { value: value + addedChar } });
      }
    } else {
      // Unmasked mode: Directly update the password
      onChange(e);
    }
  };

  return (
    <div className={classes["password-field"]}>
      <div className={classes["password-field-form"]}>
        <input
          type="text"
          placeholder={placeholder}
          value={showPassword ? value : getMaskedPassword()}
          onChange={handleInputChange}
          autoComplete="off"
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

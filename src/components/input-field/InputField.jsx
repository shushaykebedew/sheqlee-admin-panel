import classes from "./inputfield.module.css";

function InputField({ label, type, value, onChange, error, placeholder }) {
  return (
    <div className={classes["input-field"]}>
      {label && <label>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className={classes["error-message"]}>{error}</p>}
    </div>
  );
}

export default InputField;

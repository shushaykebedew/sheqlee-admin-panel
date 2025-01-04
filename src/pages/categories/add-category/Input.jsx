import classes from "./input.module.css";

function Input({ type, placeholder, value, onChange }) {
  return (
    <div className={classes.input}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;

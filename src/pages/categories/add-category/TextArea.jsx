import { useState } from "react";
import classes from "./textarea.module.css";

function TextArea({ placeholder, rows, maxChars = 128 }) {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className={classes.textarea}>
      <textarea
        placeholder={placeholder}
        rows={rows}
        maxLength={maxChars}
        value={text}
        onChange={handleChange}
      />
      <span className={classes.counter}>
        {text.length}/{maxChars}
      </span>
    </div>
  );
}

export default TextArea;

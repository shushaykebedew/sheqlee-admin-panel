import classes from "./imageinput.module.css";
import defaultIcon from "../../../images/settings - alt2.png";
function ImageInput() {
  return (
    <div className={classes["cat-icon-container"]}>
      <img src={defaultIcon} alt="category-icon" className="category-icon" />
    </div>
  );
}

export default ImageInput;

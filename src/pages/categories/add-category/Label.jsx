import classes from "./label.module.css";

function Label() {
  return (
    <div className={classes.label}>
      <p className={classes["cat-id"]}>CTID009</p>
      <p>~ Category ID</p>
    </div>
  );
}

export default Label;

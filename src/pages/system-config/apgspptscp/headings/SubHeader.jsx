import classes from "./subheader.module.css";

function SubHeader() {
  return (
    <div className={classes["sub-header"]}>
      <h2 className={classes["sub-header-text"]}>Filter By</h2>
      <div className={classes["sub-header-line"]}></div>
    </div>
  );
}

export default SubHeader;

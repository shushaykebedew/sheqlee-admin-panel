import classes from "./headers.module.css";

function Headers() {
  return (
    <div className={classes.headers}>
      <div className={classes["main-header"]}>
        <h1 className={classes["main-header-text"]}>Job posts</h1>
        <div className={classes["main-header-line"]}></div>
      </div>
      <div className={classes["sub-header"]}>
        <h2 className={classes["sub-header-text"]}>Filter By</h2>
        <div className={classes["sub-header-line"]}></div>
      </div>
    </div>
  );
}

export default Headers;

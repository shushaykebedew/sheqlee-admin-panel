import classes from "./headers.module.css";

function Headers() {
  return (
    <div className={classes.headers}>
      <div className={classes["main-header"]}>
        <h1 className={classes["main-header-text"]}>Testimonials</h1>
        <div className={classes["main-header-line"]}></div>
      </div>
    </div>
  );
}

export default Headers;

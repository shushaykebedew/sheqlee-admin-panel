import classes from "./pagenotfound.module.css";

function PageNotFound() {
  return (
    <div className={classes["page-not-found"]}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
    </div>
  );
}

export default PageNotFound;

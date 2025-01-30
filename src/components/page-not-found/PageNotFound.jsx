import { PageNotFoundIcon } from "../../SvgIcons";
import classes from "./pagenotfound.module.css";

function PageNotFound() {
  return (
    <div className={classes["page-not-found"]}>
      <PageNotFoundIcon />
      <p>404 | PAGE NOT FOUND</p>
    </div>
  );
}

export default PageNotFound;

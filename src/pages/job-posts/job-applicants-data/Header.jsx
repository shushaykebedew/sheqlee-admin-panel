import { BackwardArrowIcon } from "../../../SvgIcons";
import classes from "./header.module.css";
import { useNavigate } from "react-router-dom";

function Header({ jobPost }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("..");
  };

  return (
    <div className={classes.header}>
      <div className={classes["backward"]} onClick={handleGoBack}>
        <BackwardArrowIcon />
      </div>

      <div className={classes["header-content"]}>
        <div className={classes["company-name"]}>
          <p className={classes["company-label"]}>Company </p>
          <p className={classes["company-value"]}>
            {jobPost?.company || "N/A"}
          </p>
        </div>
        <div className={classes["apply-link"]}>
          <p className={classes["apply-link-label"]}>Apply Link</p>
          <p className={classes["apply-link-value"]}>https://kepler.co</p>
        </div>
        <div className={classes["job-title"]}>
          <p className={classes["job-title-label"]}>Job Title </p>
          <p className={classes["job-title-value"]}>
            {" "}
            {jobPost?.title || "N/A"}
          </p>
        </div>
        <div className={classes.underline}></div>
      </div>
    </div>
  );
}

export default Header;

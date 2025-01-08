import { BackwardArrowIcon } from "../../../../SvgIcons";
import classes from "./headers.module.css";
import { useNavigate } from "react-router-dom";

function Headers() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("..");
  };

  return (
    <div className={classes.headers}>
      <div className={classes["backward"]} onClick={handleGoBack}>
        <BackwardArrowIcon />
      </div>
      <div className={classes["main-header"]}>
        <h1 className={classes["main-header-text"]}>Update FAQ</h1>
        <div className={classes["main-header-line"]}></div>
      </div>
    </div>
  );
}

export default Headers;

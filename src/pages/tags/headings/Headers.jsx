import { useNavigate } from "react-router-dom";
import Button from "../../../components/button/Button";
import classes from "./headers.module.css";
import { AddIconCircle } from "../../../SvgIcons";

function Headers() {
  const navigate = useNavigate();

  function handleAddTag(e) {
    e.preventDefault();
    navigate("add-tag");
  }

  return (
    <div className={classes.headers}>
      <div className={classes["main-header"]}>
        <h1 className={classes["main-header-text"]}>Tags</h1>
        <div className={classes["main-header-line"]}></div>
      </div>

      <div className={classes["add-btn"]}>
        <button onClick={handleAddTag} className={classes["add-cat-btn"]}>
          <AddIconCircle />
          <span>add new tag</span>
        </button>
      </div>
    </div>
  );
}

export default Headers;

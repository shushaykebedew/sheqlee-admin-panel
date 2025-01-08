import { useNavigate } from "react-router-dom";
import Button from "../../../components/button/Button";
import classes from "./headers.module.css";
import { AddIconCircle } from "../../../SvgIcons";

function Headers() {
  const navigate = useNavigate();

  function handleAddCategory(e) {
    e.preventDefault();
    navigate("add-user");
  }

  return (
    <div className={classes.headers}>
      <div className={classes["main-header"]}>
        <h1 className={classes["main-header-text"]}>Users</h1>
        <div className={classes["main-header-line"]}></div>
      </div>

      <div className={classes["add-btn"]}>
        <button onClick={handleAddCategory} className={classes["add-cat-btn"]}>
          <AddIconCircle />
          <span>add new user</span>
        </button>
      </div>
    </div>
  );
}

export default Headers;

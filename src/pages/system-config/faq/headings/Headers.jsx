import { useNavigate } from "react-router-dom";
import classes from "./headers.module.css";
import { AddIconCircle } from "../../../../SvgIcons";

function Headers() {
  const navigate = useNavigate();

  function handleAddCategory(e) {
    e.preventDefault();
    navigate("add-faq");
  }

  return (
    <div className={classes.headers}>
      <div className={classes["main-header"]}>
        <h1 className={classes["main-header-text"]}>FAQ</h1>
        <div className={classes["main-header-line"]}></div>
      </div>

      <div className={classes["add-btn"]}>
        <button onClick={handleAddCategory} className={classes["add-cat-btn"]}>
          <AddIconCircle />
          <span>add new FAQ</span>
        </button>
      </div>
    </div>
  );
}

export default Headers;

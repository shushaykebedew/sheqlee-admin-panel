import { Outlet } from "react-router-dom";
import classes from "./homepage.module.css";
import Sidebar from "./sidebar/Sidebar";

function HomePage() {
  return (
    <div className={classes["main-container"]}>
      <div className={classes["left"]}>
        <Sidebar />
      </div>
      <div className={classes["right"]}>
        <Outlet />
      </div>
    </div>
  );
}

export default HomePage;

import { Outlet } from "react-router-dom";
import classes from "./subscribers.module.css";
import TopbarItems from "./topbar/TopbarItems";

function Subscribers() {
  return (
    <div className={classes.subscribers}>
      <TopbarItems />
      <Outlet />
    </div>
  );
}

export default Subscribers;

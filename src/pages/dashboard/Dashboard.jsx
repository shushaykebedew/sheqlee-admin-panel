import { Outlet } from "react-router-dom";
import classes from "./dashboard.module.css";
import TopbarItems from "./topbar/TopbarItems";

function Dashboard() {
  return (
    <div className={classes.dashboard}>
      <TopbarItems />
      <Outlet />
    </div>
  );
}

export default Dashboard;

import { Outlet } from "react-router-dom";
import classes from "./system-config.module.css";
import TopbarItems from "./topbar/TopbarItems";

function SysytemConfig() {
  return (
    <div className={classes["system-config"]}>
      <TopbarItems />
      <Outlet />
    </div>
  );
}

export default SysytemConfig;

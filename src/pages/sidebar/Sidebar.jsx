import classes from "./sidebar.module.css";
import SidebarItems from "./SidebarItems";
import SidebarLogo from "./SidebarLogo";

function Sidebar() {
  return (
    <div className={classes.sidebar}>
      <div className={classes.logo}>
        <SidebarLogo />
      </div>
      <div className={classes["sidebar-items"]}>
        <SidebarItems />
      </div>
    </div>
  );
}

export default Sidebar;

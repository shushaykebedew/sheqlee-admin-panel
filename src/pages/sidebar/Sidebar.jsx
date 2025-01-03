import classes from "./sidebar.module.css";

import AccountInfo from "./AccountInfo";
import SidebarItems from "./SidebarItems";

function Sidebar() {
  return (
    <div className={classes.sidebar}>
      <div className={classes.account}>
        <AccountInfo />
      </div>
      <div className={classes["sidebar-items"]}>
        <SidebarItems />
      </div>
    </div>
  );
}

export default Sidebar;

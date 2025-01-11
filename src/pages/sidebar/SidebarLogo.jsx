import classes from "./sidebarlogo.module.css";

import { SheqleeLogoFilled } from "../../SvgIcons";
function SidebarLogo() {
  return (
    <div className={classes["sidebar-logo"]}>
      <div className={classes.logo}>
        <SheqleeLogoFilled />
      </div>
    </div>
  );
}

export default SidebarLogo;

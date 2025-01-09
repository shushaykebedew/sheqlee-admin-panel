import classes from "./accountinfo.module.css";

import { SheqleeLogoFilled } from "../../SvgIcons";
function AccountInfo() {
  return (
    <div className={classes["account-info"]}>
      <div className={classes.logo}>
        <SheqleeLogoFilled />
      </div>
    </div>
  );
}

export default AccountInfo;

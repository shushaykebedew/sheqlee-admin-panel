import { Outlet, useLocation } from "react-router-dom";
import classes from "./system-config.module.css";
import TopbarItems from "./topbar/TopbarItems";

function SysytemConfig() {
  const location = useLocation();
  const isAddFAQRoute = location.pathname.endsWith("add-faq");
  const isUpdateFAQRoute = location.pathname.includes("update-faq");
  const isUpdateTestimonialRoute =
    location.pathname.includes("update-testimonial");
  const isUpdateHeroRoute = location.pathname.includes("update-hero");
  const isUpdateFooterRoute = location.pathname.includes("update-footer");
  return (
    <div className={classes["system-config"]}>
      {!isAddFAQRoute &&
        !isUpdateFAQRoute &&
        !isUpdateTestimonialRoute &&
        !isUpdateHeroRoute &&
        !isUpdateFooterRoute && <TopbarItems />}
      <Outlet />
    </div>
  );
}

export default SysytemConfig;

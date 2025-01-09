import { Outlet, useLocation } from "react-router-dom";
import classes from "./system-config.module.css";
import TopbarItems from "./topbar/TopbarItems";

function SysytemConfig() {
  const location = useLocation();
  const isAddFAQRoute = location.pathname.endsWith("add-faq");
  const isUpdateFAQRoute = location.pathname.includes("update-faq");
  const isUpdateTestimonialRoute =
    location.pathname.includes("update-testimonial");
  return (
    <div className={classes["system-config"]}>
      {!isAddFAQRoute && !isUpdateFAQRoute && !isUpdateTestimonialRoute && (
        <TopbarItems />
      )}
      <Outlet />
    </div>
  );
}

export default SysytemConfig;

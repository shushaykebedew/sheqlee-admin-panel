import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./sidebaritems.module.css";
import { sidebarItems } from "./items";
import { useLocalStorage } from "../../hooks/useLocalStorage";

function SidebarItems() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveIndexFromPath = (pathname) => {
    const path = pathname.replace(/^\/+|\/+$/g, "");

    if (!path || path === "dashboard" || path.startsWith("dashboard")) {
      return 1;
    }

    if (path === "job-posts" || path.startsWith("job-posts")) {
      return 2;
    }

    if (path === "companies" || path.startsWith("companies")) {
      return 3;
    }

    if (path === "freelancers" || path.startsWith("freelancers")) {
      return 4;
    }

    if (path === "categories" || path.startsWith("categories")) {
      return 5;
    }

    if (path === "tags" || path.startsWith("tags")) {
      return 6;
    }

    if (path === "subscribers" || path.startsWith("subscribers")) {
      return 7;
    }

    if (path === "feedbacks" || path.startsWith("feedbacks")) {
      return 8;
    }

    if (path === "system-config" || path.startsWith("system-config")) {
      return 9;
    }

    if (path === "users" || path.startsWith("users")) {
      return 10;
    }

    if (path === "edit-profile" || path.startsWith("edit-profile")) {
      return 0;
    }

    return 1;
  };

  const [sidebarActiveIndex, setSidebarActiveIndex] = useLocalStorage(
    getActiveIndexFromPath(location.pathname),
    "sidebarActiveIndex",
  );

  useEffect(() => {
    setSidebarActiveIndex(getActiveIndexFromPath(location.pathname));
  }, [location.pathname, setSidebarActiveIndex]);

  const handleItemClick = (index, path) => {
    setSidebarActiveIndex(index);
    navigate(path);
  };

  return (
    <div className={classes["sidebar-links"]}>
      <ul>
        {sidebarItems.map((item, index) => (
          <li
            key={item.to}
            className={`${classes["sidebar-item"]} ${
              sidebarActiveIndex === index ? classes.active : ""
            }`}
            onClick={() => handleItemClick(index, item.to)}
          >
            <div className={classes["sidebar-link"]}>
              <span dangerouslySetInnerHTML={{ __html: item.icon }}></span>
              <span className={classes["sidebar-item-text"]}>{item.title}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarItems;

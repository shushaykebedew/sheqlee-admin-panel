import { useEffect } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import classes from "./topbaritems.module.css";
import { Link, useLocation } from "react-router-dom";

const topbarItems = [
  {
    title: "Job Posts",
    to: "job-posts",
  },
  {
    title: "Companies",
    to: "companies",
  },
  {
    title: "Freelancers",
    to: "freelancers",
  },
  {
    title: "Email Alerts",
    to: "email-alerts",
  },
];

function TopbarItems() {
  const location = useLocation();

  const getActiveIndexFromPath = (pathname) => {
    const path = pathname.replace(/^\/+|\/+$/g, "");
    const segments = path.split("/").filter(Boolean);

    if (segments[0] === "dashboard") {
      const nestedPath = segments[1];

      if (!nestedPath || nestedPath === "job-posts") {
        return 0;
      }

      if (nestedPath === "companies") {
        return 1;
      }

      if (nestedPath === "freelancers") {
        return 2;
      }

      if (nestedPath === "email-alerts") {
        return 3;
      }

      return 0;
    }

    return 0;
  };

  const [dashboardActiveIndex, setDashboardActiveIndex] = useLocalStorage(
    getActiveIndexFromPath(location.pathname),
    "dashboardActiveIndex",
  );

  useEffect(() => {
    setDashboardActiveIndex(getActiveIndexFromPath(location.pathname));
  }, [location.pathname, setDashboardActiveIndex]);

  const handleItemClick = (index) => {
    setDashboardActiveIndex(index);
  };

  return (
    <div className={classes["topbar-items"]}>
      <ul>
        {topbarItems.map((item, index) => (
          <li
            key={item.to}
            className={`${classes["topbar-item"]} ${
              dashboardActiveIndex === index ? classes.active : ""
            }`}
            onClick={() => handleItemClick(index)}
          >
            <Link to={`/${location.pathname.split("/")[1]}/${item.to}`}>
              {item.title}
            </Link>

            {index < topbarItems.length - 1 &&
              dashboardActiveIndex - 1 !== index && (
                <span className={classes["vertical-line"]}></span>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopbarItems;

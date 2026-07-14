import { useEffect } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import classes from "./topbaritems.module.css";
import { Link, useLocation } from "react-router-dom";

const topbarItems = [
  {
    title: "Companies",
    to: "companies",
  },
  {
    title: "Categories",
    to: "categories",
  },
  {
    title: "Tags",
    to: "tags",
  },
];

function TopbarItems() {
  const location = useLocation();

  const getActiveIndexFromPath = (pathname) => {
    const path = pathname.replace(/^\/+|\/+$/g, "");
    const segments = path.split("/").filter(Boolean);

    if (segments[0] === "subscribers") {
      const nestedPath = segments[1];

      if (!nestedPath || nestedPath === "companies") {
        return 0;
      }

      if (nestedPath === "categories") {
        return 1;
      }

      if (nestedPath === "tags") {
        return 2;
      }

      return 0;
    }

    return 0;
  };

  const [subscribersActiveIndex, setSubscribersActiveIndex] = useLocalStorage(
    getActiveIndexFromPath(location.pathname),
    "subscribersActiveIndex",
  );

  useEffect(() => {
    setSubscribersActiveIndex(getActiveIndexFromPath(location.pathname));
  }, [location.pathname, setSubscribersActiveIndex]);

  const handleItemClick = (index) => {
    setSubscribersActiveIndex(index);
  };

  return (
    <div className={classes["topbar-items"]}>
      <ul>
        {topbarItems.map((item, index) => (
          <li
            key={item.to}
            className={`${classes["topbar-item"]} ${
              subscribersActiveIndex === index ? classes.active : ""
            }`}
            onClick={() => handleItemClick(index)}
          >
            <Link to={`/subscribers/${item.to}`}>{item.title}</Link>

            {index < topbarItems.length - 1 &&
              subscribersActiveIndex - 1 !== index && (
                <span className={classes["vertical-line"]}></span>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopbarItems;

import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./sidebaritems.module.css";
import { sidebarItems } from "./items";
import { useLocalStorage } from "../../hooks/useLocalStorage";

function SidebarItems() {
  const navigate = useNavigate();

  const [sidebarActiveIndex, setSidebarActiveIndex] = useLocalStorage(
    0,
    "sidebarActiveIndex"
  );

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

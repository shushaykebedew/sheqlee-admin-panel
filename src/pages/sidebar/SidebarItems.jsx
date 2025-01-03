import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./sidebaritems.module.css";
import { sidebarItems } from "./items";
import { useLocalStorage } from "../../hooks/useLocalStorage";

function SidebarItems() {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useLocalStorage(0, "activeIndex");

  const handleItemClick = (index, path) => {
    setActiveIndex(index);
    navigate(path);
  };

  return (
    <div className={classes["sidebar-links"]}>
      <ul>
        {sidebarItems.map((item, index) => (
          <li
            key={item.to}
            className={`${classes["sidebar-item"]} ${
              activeIndex === index ? classes.active : ""
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

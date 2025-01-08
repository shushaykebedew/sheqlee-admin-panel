import { useState } from "react";
import classes from "./topbaritems.module.css";
import { Link } from "react-router-dom";

const topbarItems = [
  {
    title: "FAQ",
    to: "faq",
  },
  {
    title: "APGSPPTSCP",
    to: "apgspptscp",
  },
  {
    title: "Testimonials",
    to: "testimonials",
  },
  {
    title: "Hero",
    to: "hero",
  },
  {
    title: "Footer",
    to: "footer",
  },
];

function TopbarItems() {
  const [activeIndex, setActiveIndex] = useState(0);

  function handleItemClick(index) {
    setActiveIndex(index);
  }

  return (
    <div className={classes["topbar-items"]}>
      <ul>
        {topbarItems.map((item, index) => (
          <li
            key={item.to}
            className={`${classes["topbar-item"]} ${
              activeIndex === index ? classes.active : ""
            }`}
            onClick={() => handleItemClick(index)}
          >
            <Link to={item.to}>{item.title}</Link>

            {index < topbarItems.length - 1 && activeIndex - 1 !== index && (
              <span className={classes["vertical-line"]}></span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopbarItems;

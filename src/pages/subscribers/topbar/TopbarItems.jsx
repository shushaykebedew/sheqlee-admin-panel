import { useLocalStorage } from "../../../hooks/useLocalStorage";
import classes from "./topbaritems.module.css";
import { Link } from "react-router-dom";

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
  const [subscribersActiveIndex, setSubscribersActiveIndex] = useLocalStorage(
    0,
    "subscribersActiveIndex"
  );

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
            <Link to={item.to}>{item.title}</Link>

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

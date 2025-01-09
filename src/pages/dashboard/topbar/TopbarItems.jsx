import { useLocalStorage } from "../../../hooks/useLocalStorage";
import classes from "./topbaritems.module.css";
import { Link } from "react-router-dom";

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
  const [dashboardActiveIndex, setDashboardActiveIndex] = useLocalStorage(
    0,
    "dashboardActiveIndex"
  );

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
            <Link to={item.to}>{item.title}</Link>

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

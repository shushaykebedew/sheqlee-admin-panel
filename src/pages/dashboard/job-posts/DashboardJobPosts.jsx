import classes from "./dashboardjobposts.module.css";
import CounterCard from "../cards/CounterCard";
import StatusCard from "../cards/StatusCard";
import CardWithDropDown from "../cards/CardWithDropDown";

function DashboardJobPosts() {
  return (
    <div className={classes["dashboard-job-posts"]}>
      <div className={classes["counter-cards"]}>
        <CounterCard number={14124} text="Total jobs posted" />
        <CardWithDropDown number={1045} text="Jobs posted in" filterBy="year" />
        <CardWithDropDown number={145} text="Jobs posted in" filterBy="month" />
      </div>
      <div className={classes["status-cards"]}>
        <StatusCard
          number={984}
          text="Jobs posted this year so far"
          percentage={11}
        />
        <StatusCard
          number={84}
          text="Jobs posted this month so far"
          percentage={-7}
        />
      </div>
    </div>
  );
}

export default DashboardJobPosts;

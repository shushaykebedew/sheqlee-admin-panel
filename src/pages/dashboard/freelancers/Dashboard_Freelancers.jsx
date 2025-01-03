import classes from "./dashboard_freelancers.module.css";
import CounterCard from "../cards/CounterCard";
import StatusCard from "../cards/StatusCard";
import CardWithDropDown from "../cards/CardWithDropDown";

function DashboardFreelancers() {
  return (
    <div className={classes["dashboard-freelancers"]}>
      <div className={classes["counter-cards"]}>
        <CounterCard number={5471} text="Total freelancers registered" />
        <CardWithDropDown
          number={1587}
          text="Freelancers registered in"
          filterBy="year"
        />
        <CardWithDropDown
          number={214}
          text="Freelancers registered in"
          filterBy="month"
        />
      </div>
      <div className={classes["status-cards"]}>
        <StatusCard
          number={874}
          text="Freelancers registered this year so far"
          percentage={11}
        />
        <StatusCard
          number={101}
          text="Freelancers registered this month so far"
          percentage={-7}
        />
      </div>
    </div>
  );
}

export default DashboardFreelancers;

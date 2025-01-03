import classes from "./dashboard_comapnies.module.css";
import CounterCard from "../cards/CounterCard";
import StatusCard from "../cards/StatusCard";
import CardWithDropDown from "../cards/CardWithDropDown";

function DashboardCompanies() {
  return (
    <div className={classes["dashboard-companies"]}>
      <div className={classes["counter-cards"]}>
        <CounterCard number={1124} text="Total companies registered" />
        <CardWithDropDown
          number={245}
          text="Co. registered in"
          filterBy="year"
        />
        <CardWithDropDown
          number={35}
          text="Co. registered in"
          filterBy="month"
        />
      </div>
      <div className={classes["status-cards"]}>
        <StatusCard
          number={175}
          text="Co. registered this year so far"
          percentage={11}
        />
        <StatusCard
          number={14}
          text="Co. registered this month so far"
          percentage={-7}
        />
      </div>
    </div>
  );
}

export default DashboardCompanies;

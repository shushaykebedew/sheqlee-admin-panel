import classes from "./companies_stats.module.css";
import CounterCard from "../cards/CounterCard";
import StatusCard from "../cards/StatusCard";
import CardWithDropDown from "../cards/CardWithDropDown";

function CompaniesStats() {
  return (
    <div className={classes["companies-stats"]}>
      <div className={classes["counter-cards"]}>
        <CounterCard number={1124} text="Total company subs" />
        <CardWithDropDown number={245} text="Company subs in" filterBy="year" />
        <CardWithDropDown number={35} text="Company subs in" filterBy="month" />
      </div>
      <div className={classes["status-cards"]}>
        <StatusCard
          number={175}
          text="Company subs this year so far"
          percentage={11}
        />
        <StatusCard
          number={14}
          text="Company subs this month so far"
          percentage={-7}
        />
      </div>
    </div>
  );
}

export default CompaniesStats;

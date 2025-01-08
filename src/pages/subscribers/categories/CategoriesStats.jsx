import classes from "./categories_stats.module.css";
import CounterCard from "../cards/CounterCard";
import StatusCard from "../cards/StatusCard";
import CardWithDropDown from "../cards/CardWithDropDown";

function CategoriesStats() {
  return (
    <div className={classes["categories-stats"]}>
      <div className={classes["counter-cards"]}>
        <CounterCard number={5471} text="Total category subs" />
        <CardWithDropDown
          number={1587}
          text="Category subs in"
          filterBy="year"
        />
        <CardWithDropDown
          number={214}
          text="Category subs in"
          filterBy="month"
        />
      </div>
      <div className={classes["status-cards"]}>
        <StatusCard
          number={874}
          text="Category subs registered this year so far"
          percentage={11}
        />
        <StatusCard
          number={101}
          text="Category registered this month so far"
          percentage={-7}
        />
      </div>
    </div>
  );
}

export default CategoriesStats;

import classes from "./tags_stats.module.css";
import CounterCard from "../cards/CounterCard";
import StatusCard from "../cards/StatusCard";
import CardWithDropDown from "../cards/CardWithDropDown";

function TagsStats() {
  return (
    <div className={classes["tags-stats"]}>
      <div className={classes["counter-cards"]}>
        <CounterCard number={5471} text="Total tag subs" />
        <CardWithDropDown number={1587} text="Tag subs in" filterBy="year" />
        <CardWithDropDown number={214} text="Tag subs in" filterBy="month" />
      </div>
      <div className={classes["status-cards"]}>
        <StatusCard
          number={874}
          text="Tag subs this year so far"
          percentage={11}
        />
        <StatusCard
          number={101}
          text="Tag subs this month so far"
          percentage={-7}
        />
      </div>
    </div>
  );
}

export default TagsStats;

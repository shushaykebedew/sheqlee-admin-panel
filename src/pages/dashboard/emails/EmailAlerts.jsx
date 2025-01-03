import classes from "./emailalerts.module.css";
import CounterCard from "../cards/CounterCard";
import StatusCard from "../cards/StatusCard";
import CardWithDropDown from "../cards/CardWithDropDown";

function EmailAlerts() {
  return (
    <div className={classes["email-alerts"]}>
      <div className={classes["counter-cards"]}>
        <CounterCard number={5471} text="Total email alerts sent" />
        <CardWithDropDown
          number={1587}
          text="Email alerts sents in"
          filterBy="year"
        />
        <CardWithDropDown
          number={214}
          text="Email alerts sents in"
          filterBy="month"
        />
      </div>
      <div className={classes["status-cards"]}>
        <StatusCard
          number={874}
          text="Email alerts sents this year so far"
          percentage={11}
        />
        <StatusCard
          number={101}
          text="Email alerts sents this month so far"
          percentage={-7}
        />
      </div>
    </div>
  );
}

export default EmailAlerts;

import classes from "./countercard.module.css";

function CounterCard({ text, number }) {
  const formatedNumber = Number(number).toLocaleString();

  return (
    <div className={classes["counter-card"]}>
      <div className={classes.number}>{formatedNumber}</div>
      <div className={classes.text}>{text}</div>
    </div>
  );
}

export default CounterCard;

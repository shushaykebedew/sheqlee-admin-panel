import classes from "./statuscard.module.css";

const icons = {
  increment: `<svg xmlns="http://www.w3.org/2000/svg" width="40.053" height="57.809" viewBox="0 0 40.053 57.809">
  <g id="Group_8" data-name="Group 8" transform="translate(-923.787 -740.787)">
    <rect id="Rectangle_212" data-name="Rectangle 212" width="7" height="56" rx="3.5" transform="translate(940 742.595)" fill="#0f9d58"/>
    <rect id="Rectangle_213" data-name="Rectangle 213" width="5.608" height="28.038" rx="2.804" transform="translate(943.613 740.787) rotate(45)" fill="#0f9d58"/>
    <rect id="Rectangle_214" data-name="Rectangle 214" width="5.608" height="28.038" rx="2.804" transform="translate(940.049 744.752) rotate(-45)" fill="#0f9d58"/>
  </g>
</svg>
`,
  decrement: `<svg xmlns="http://www.w3.org/2000/svg" width="40.053" height="57.809" viewBox="0 0 40.053 57.809">
  <g id="Group_9" data-name="Group 9" transform="translate(963.84 798.595) rotate(180)">
    <rect id="Rectangle_212" data-name="Rectangle 212" width="7" height="56" rx="3.5" transform="translate(940 742.595)" fill="#db4437"/>
    <rect id="Rectangle_213" data-name="Rectangle 213" width="5.608" height="28.038" rx="2.804" transform="translate(943.613 740.787) rotate(45)" fill="#db4437"/>
    <rect id="Rectangle_214" data-name="Rectangle 214" width="5.608" height="28.038" rx="2.804" transform="translate(940.049 744.752) rotate(-45)" fill="#db4437"/>
  </g>
</svg>`,
};

function StatusCard({ text, number, percentage }) {
  const isIncrement = Number(percentage) > 0;
  const icon = isIncrement ? icons.increment : icons.decrement;
  const formatedNumber = Number(number).toLocaleString();

  return (
    <div className={classes["status-card"]}>
      <div className={classes.left}>
        <div className={classes.number}>{formatedNumber}</div>
        <div className={classes.text}>{text}</div>
      </div>
      <div className={classes.right}>
        <div
          className={`${classes.icon} ${
            isIncrement ? classes.increased : classes.decreased
          }`}
          dangerouslySetInnerHTML={{ __html: icon }}
        ></div>
        <div
          className={`${classes.percentage} ${
            isIncrement ? classes.increased : classes.decreased
          }`}
        >
          {Math.abs(percentage)}%
        </div>
      </div>
    </div>
  );
}

export default StatusCard;

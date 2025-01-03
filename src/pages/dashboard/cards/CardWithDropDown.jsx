import { useState } from "react";
import Dropdown from "../../../components/dropdown/DropdownMenu";
import classes from "./cardwithdropdown.module.css";

function CardWithDropDown({ text, number, filterBy }) {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const formatedNumber = Number(number).toLocaleString();
  return (
    <div className={classes["card-with-dropdown"]}>
      <div className={classes.number}>{formatedNumber}</div>
      <div className={classes.lower}>
        <div className={classes.text}>{text}</div>
        <div className={classes.filterby}>
          {filterBy === "year" && (
            <Dropdown
              type="year"
              selected={selectedYear}
              onChange={(value) => setSelectedYear(value)}
            />
          )}

          {filterBy === "month" && (
            <Dropdown
              type="month"
              selected={selectedMonth}
              onChange={(value) => setSelectedMonth(value)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CardWithDropDown;

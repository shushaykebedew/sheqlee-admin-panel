import { useContext, useState } from "react";
import classes from "./filteration.module.css";
import DateModal from "./DateModal";
import FilterByAction from "./FilterByAction";
import SubHeader from "../SubHeader";
import { CalendarIcon } from "../../../../SvgIcons";

function DatePicker() {
  const [isOpen, setIsOpen] = useState(false);

  function handleDateModalClose() {
    setIsOpen(false);
  }
  return (
    <>
      <button
        className={classes["date-picker"]}
        onClick={() => setIsOpen(true)}
      >
        <CalendarIcon />
      </button>
      <DateModal isOpen={isOpen} onClose={handleDateModalClose} />
    </>
  );
}

function Filteration() {
  return (
    <div className={classes.filteration}>
      <div className={classes["sub-header"]}>
        <SubHeader />
      </div>
      <div className={classes.search}>
        <DatePicker />
      </div>
      <div className={classes["filteration-group"]}>
        <FilterByAction />
      </div>
    </div>
  );
}
export default Filteration;

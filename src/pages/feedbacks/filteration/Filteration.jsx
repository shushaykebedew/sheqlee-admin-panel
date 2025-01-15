import { useContext, useState } from "react";
import classes from "./filteration.module.css";
import { SearchIcon, CalendarIcon } from "../../../SvgIcons";

import DateModal from "./DateModal";
import { FeedbacksContext } from "../Feedbacks";

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

function SearchInput() {
  const { onSearchChange } = useContext(FeedbacksContext);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearchChange(inputValue);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={classes["search-input"]}>
      <input
        type="text"
        placeholder="Search feedback..."
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <span className={classes["search-icon"]}>
        <SearchIcon />
      </span>
    </div>
  );
}

function Filteration() {
  return (
    <div className={classes.filteration}>
      <div className={classes.filterby}>
        <div className={classes.search}>
          <DatePicker />
          <SearchInput />
        </div>
      </div>
    </div>
  );
}
export default Filteration;

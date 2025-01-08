import { useContext, useState } from "react";
import classes from "./filteration.module.css";
import { SearchIcon, CalendarIcon } from "../../../SvgIcons";
import DateModal from "./DateModal";
import FilterByRole from "./FilterByRole";
import { UsersContext } from "../Users";
import SubHeader from "../headings/SubHeader";

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
  const { onSearchChange } = useContext(UsersContext);

  const handleChange = (e) => {
    const value = e.target.value;
    onSearchChange(value);
  };

  return (
    <div className={classes["search-input"]}>
      <input
        type="text"
        placeholder="Search by name or email..."
        onChange={handleChange}
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
        <div className={classes["filteration-dropdowns"]}>
          <div className={classes["sub-header"]}>
            <SubHeader />
          </div>
          <div className={classes["filteration-group"]}>
            <FilterByRole />
          </div>
        </div>
        <div className={classes.search}>
          <DatePicker />
          <SearchInput />
        </div>
      </div>
    </div>
  );
}
export default Filteration;

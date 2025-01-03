import { useContext, useState } from "react";

import classes from "./filteration.module.css";
import Headers from "./Headers";
import { SearchIcon, CalendarIcon, PolygonDown } from "../../../SvgIcons";

import DateModal from "./DateModal";
import FilterByStatus from "./FilterByStatus";
import FilterByAction from "./FilterByAction";
import FilterByCategory from "./FilterByCategory";
import FilterByJobType from "./FilterByJobType";
import FilterByTags from "./FilterByTags";
import FilterBySkillLevel from "./FilterBySkillLevel";
import { JobsContext } from "../JobPosts";

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
  const { onSearchChange } = useContext(JobsContext);

  const handleChange = (e) => {
    const value = e.target.value;
    onSearchChange(value);
  };

  return (
    <div className={classes["search-input"]}>
      <input
        type="text"
        placeholder="Search by title or company name..."
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
      <div className={classes.titles}>
        <Headers />
      </div>
      <div className={classes.filterby}>
        <div className={classes["filteration-dropdowns"]}>
          <div className={classes["filteration-group"]}>
            <FilterByStatus />
            <FilterByAction />
          </div>
          <div className={classes["filteration-group"]}>
            <FilterByCategory />
            <FilterByJobType />
          </div>
          <div className={classes["filteration-group"]}>
            <FilterByTags />
            <FilterBySkillLevel />
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

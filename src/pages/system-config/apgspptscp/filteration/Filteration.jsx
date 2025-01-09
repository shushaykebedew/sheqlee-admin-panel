import classes from "./filteration.module.css";
import FilterByRole from "./DocType";
import SubHeader from "../headings/SubHeader";

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
      </div>
    </div>
  );
}
export default Filteration;

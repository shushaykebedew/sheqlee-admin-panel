import React, { useState, useContext, useRef } from "react";
import ReactDOM from "react-dom";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import classes from "./datemodal.module.css";
import { CalendarIcon, CancelIcon } from "../../../SvgIcons";
import { FreelancersContext } from "../Freelancers";

function Backdrop({ onClose }) {
  return (
    <div className={classes.backdrop}>
      <button onClick={onClose} className={classes["date-picker-close-btn"]}>
        <CancelIcon />
      </button>
    </div>
  );
}

function DatePickerModal({ children }) {
  return <div className={classes.modal}>{children}</div>;
}

function DateModal({ isOpen, onClose }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { onApply } = useContext(FreelancersContext);

  // Create refs for the input fields
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const handleApplyFilters = () => {
    console.log("Applying filters:", startDate, endDate);
    console.log("onApply function:", onApply);

    if (onApply) {
      onApply(startDate, endDate);
    } else {
      console.error("onApply is undefined");
    }

    onClose();
  };

  const focusStartDateInput = () => {
    if (startDateRef.current) {
      startDateRef.current.querySelector("input").focus();
    }
  };

  const focusEndDateInput = () => {
    if (endDateRef.current) {
      endDateRef.current.querySelector("input").focus();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <DatePickerModal>
          <div className={classes["date-picker-modal"]}>
            <h2>FILTER BY DATE</h2>
            <div className={classes["date-picker-inputs"]}>
              <div
                className={classes["date-picker-wrapper"]}
                ref={startDateRef}
              >
                <Datetime
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  inputProps={{
                    placeholder: "From date",
                    className: classes.input,
                  }}
                />
                <button
                  onClick={focusStartDateInput}
                  className={classes["calendar-icon"]}
                >
                  <CalendarIcon />
                </button>
              </div>
              <div className={classes["date-picker-wrapper"]} ref={endDateRef}>
                <Datetime
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                  inputProps={{
                    placeholder: "To date",
                    className: classes.input,
                  }}
                />
                <button
                  onClick={focusEndDateInput}
                  className={classes["calendar-icon"]}
                >
                  <CalendarIcon />
                </button>
              </div>
            </div>
            <div className={classes["date-picker-action"]}>
              <button
                onClick={handleApplyFilters}
                className={classes["date-picker-apply-btn"]}
              >
                Apply filter
              </button>
            </div>
          </div>
        </DatePickerModal>,
        document.getElementById("modal-root")
      )}
    </>
  );
}

export default DateModal;

import React, { useState, createContext } from "react";
import classes from "./jobapplicantsdata.module.css";
import Header from "./Header";
import Filteration from "./filteration/Filteration";
import JobApplicantsTable from "./job-applicants-table/JobApplicantsTable";
import { dummyApplicants } from "./dummyApplicants";

// Create Context
export const JobApplicantsContext = createContext();

function JobApplicantsData() {
  const [applicants, setApplicants] = useState(dummyApplicants);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sortBy, setSortBy] = useState("frId"); // Added state for sorting
  const [sortOrder, setSortOrder] = useState("asc"); // Added state for sorting

  const applyDateFilter = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    setApplicants((prevApplicants) => {
      return prevApplicants.filter((applicant) => {
        const appDate = new Date(applicant.appDate); // Assume applicant has `appDate`
        return (
          (!start || appDate >= new Date(start)) &&
          (!end || appDate <= new Date(end))
        );
      });
    });
  };

  const handleDelete = (frId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this applicant with id : ${frId}? `
    );
    if (confirmDelete) {
      setApplicants((prevApplicants) =>
        prevApplicants.filter((applicant) => applicant.frId !== frId)
      );
    }
  };

  const handleSortChange = (column) => {
    const newSortOrder =
      sortBy === column && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(column);
    setSortOrder(newSortOrder);
    setApplicants((prevApplicants) => {
      const sorted = [...prevApplicants].sort((a, b) => {
        const aValue = a[column];
        const bValue = b[column];
        return newSortOrder === "asc"
          ? aValue > bValue
            ? 1
            : -1
          : aValue < bValue
          ? 1
          : -1;
      });
      return sorted;
    });
  };

  return (
    <JobApplicantsContext.Provider value={{ applyDateFilter }}>
      <div className={classes["job-applicants"]}>
        <div className={classes.top}>
          <Header />
          <Filteration />
        </div>
        <div>
          <JobApplicantsTable
            dummyApplicants={applicants}
            onDelete={handleDelete}
            onSortChange={handleSortChange}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        </div>
      </div>
    </JobApplicantsContext.Provider>
  );
}

export default JobApplicantsData;

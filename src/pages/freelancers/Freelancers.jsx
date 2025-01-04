import React, { createContext, useReducer } from "react";
import classes from "./freelancers.module.css";
import { dummyFreelancers } from "./data";
import Headers from "./Headers";
import Filteration from "./filteration/Filteration";
import FreelancersTable from "./freelancers-table/FreelancersTable";

export const FreelancersContext = createContext();

const FreelancersReducer = (state, action) => {
  switch (action.type) {
    case "SET_FILTER": {
      const { filterType, filterValue } = action.payload;

      const updatedFilters = {
        ...state.filters,
        [filterType]: filterValue,
      };

      const filteredFreelancers = dummyFreelancers.filter((freelancer) =>
        Object.entries(updatedFilters).every(([key, value]) => {
          if (value.startsWith("all-") || !value) return true;
          const freelancerValue = freelancer[key]?.toLowerCase() || "";
          return freelancerValue === value.toLowerCase();
        })
      );

      return { ...state, filters: updatedFilters, filteredFreelancers };
    }

    case "SET_SEARCH": {
      const searchQuery = action.payload;

      const filteredFreelancers = dummyFreelancers.filter((freelancer) => {
        const freelancerName = freelancer.name?.toLowerCase() || "";
        const freelancerEmail = freelancer.email?.toLowerCase() || "";
        const query = searchQuery.toLowerCase();

        return (
          freelancerName.includes(query) || freelancerEmail.includes(query)
        );
      });

      return { ...state, searchQuery, filteredFreelancers };
    }

    case "SET_DATE_RANGE": {
      const { startDate, endDate } = action.payload;

      const filteredByDate = dummyFreelancers.filter((freelancer) => {
        const regDate = new Date(freelancer.regDate);
        if (startDate && regDate < new Date(startDate)) return false;
        if (endDate && regDate > new Date(endDate)) return false;
        return true;
      });

      return {
        ...state,
        dateRange: { startDate, endDate },
        filteredFreelancers: filteredByDate,
      };
    }

    case "SET_SORT": {
      const { sortBy, sortOrder } = action.payload;

      const sortedFreelancers = [...state.filteredFreelancers].sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        // Convert postDate to Date object if sorting by postDate
        if (sortBy === "postDate") {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });

      return {
        ...state,
        sortBy,
        sortOrder,
        filteredFreelancers: sortedFreelancers,
      };
    }

    case "DELETE_FREELANCER": {
      const updatedFreelancers = state.filteredFreelancers.filter(
        (freelancer) => freelancer.frId !== action.payload
      );
      return { ...state, filteredFreelancers: updatedFreelancers };
    }

    default:
      console.error(`Unknown action type: ${action.type}`);
      return state;
  }
};

function Freelancers() {
  const initialState = {
    filters: {},
    searchQuery: "",
    dateRange: { startDate: null, endDate: null },
    filteredFreelancers: dummyFreelancers,
    sortBy: null,
    sortOrder: "asc",
  };

  const [state, dispatch] = useReducer(FreelancersReducer, initialState);

  const handleFilterChange = (filterCriteria) => {
    const [filterType, filterValue] = filterCriteria.split(":");
    dispatch({ type: "SET_FILTER", payload: { filterType, filterValue } });
  };

  const handleSearchChange = (searchValue) => {
    dispatch({ type: "SET_SEARCH", payload: searchValue });
  };

  const handleDateRangeChange = (startDate, endDate) => {
    dispatch({ type: "SET_DATE_RANGE", payload: { startDate, endDate } });
  };

  const handleSortChange = (sortBy) => {
    const sortOrder =
      state.sortBy === sortBy && state.sortOrder === "asc" ? "desc" : "asc";

    dispatch({ type: "SET_SORT", payload: { sortBy, sortOrder } });
  };

  const handleFreelancerDeletion = (frId) => {
    if (
      window.confirm(
        `Are you sure you want to delete this company with id ${frId} ?`
      )
    ) {
      dispatch({ type: "DELETE_FREELANCER", payload: frId });
    }
  };

  return (
    <FreelancersContext.Provider
      value={{
        onFilterChange: handleFilterChange,
        onSearchChange: handleSearchChange,
        dummyFreelancers: state.filteredFreelancers,
        onApply: (startDate, endDate) =>
          handleDateRangeChange(startDate, endDate),
        onDelete: handleFreelancerDeletion,
        onSortChange: handleSortChange,
        sortBy: state.sortBy,
        sortOrder: state.sortOrder,
      }}
    >
      {dummyFreelancers.length === 0 ? (
        <p className={classes["no-data-message"]}>
          {" "}
          There are no freelancers right now!
        </p>
      ) : (
        <div className={classes["freelancers"]}>
          <div className={classes["header"]}>
            <div className={classes.titles}>
              <Headers />
            </div>
            <div className={classes.filters}>
              <Filteration />
            </div>
          </div>
          <div className="freelancers-table">
            <FreelancersTable />
          </div>
        </div>
      )}
    </FreelancersContext.Provider>
  );
}

export default Freelancers;

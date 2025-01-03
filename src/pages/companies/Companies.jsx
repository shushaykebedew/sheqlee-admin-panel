import React, { createContext, useReducer } from "react";
import CompaniesTable from "./companies-table/CompaniesTable";
import classes from "./companies.module.css";
import { dummyCompanies } from "./data";
import Headers from "./Headers";
import Filteration from "./filteration/Filteration";

export const CompaniesContext = createContext();

const companiesReducer = (state, action) => {
  switch (action.type) {
    case "SET_FILTER": {
      const { filterType, filterValue } = action.payload;

      const updatedFilters = {
        ...state.filters,
        [filterType]: filterValue,
      };

      const filteredCompanies = dummyCompanies.filter((company) =>
        Object.entries(updatedFilters).every(([key, value]) => {
          if (value.startsWith("all-") || !value) return true;
          const companyValue = company[key]?.toLowerCase() || "";
          return companyValue === value.toLowerCase();
        })
      );

      return { ...state, filters: updatedFilters, filteredCompanies };
    }

    case "SET_SEARCH": {
      const searchQuery = action.payload;

      const filteredCompanies = dummyCompanies.filter((company) => {
        const companyName = company.companyName?.toLowerCase() || "";
        const companyEmail = company.email?.toLowerCase() || "";
        const query = searchQuery.toLowerCase();

        return companyName.includes(query) || companyEmail.includes(query);
      });

      return { ...state, searchQuery, filteredCompanies };
    }

    case "SET_DATE_RANGE": {
      const { startDate, endDate } = action.payload;

      const filteredByDate = dummyCompanies.filter((company) => {
        const regDate = new Date(company.regDate);
        if (startDate && regDate < new Date(startDate)) return false;
        if (endDate && regDate > new Date(endDate)) return false;
        return true;
      });

      return {
        ...state,
        dateRange: { startDate, endDate },
        filteredCompanies: filteredByDate,
      };
    }

    case "DELETE_COMPANY": {
      const updatedCompanies = state.filteredCompanies.filter(
        (company) => company.coID !== action.payload
      );
      return { ...state, filteredCompanies: updatedCompanies };
    }

    default:
      console.error(`Unknown action type: ${action.type}`);
      return state;
  }
};

function Companies() {
  const initialState = {
    filters: {},
    searchQuery: "",
    dateRange: { startDate: null, endDate: null },
    filteredCompanies: dummyCompanies,
  };

  const [state, dispatch] = useReducer(companiesReducer, initialState);

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

  const handleCompanyDeletion = (coID) => {
    if (
      window.confirm(
        `Are you sure you want to delete this company with id ${coID} ?`
      )
    ) {
      dispatch({ type: "DELETE_COMPANY", payload: coID });
    }
  };

  return (
    <CompaniesContext.Provider
      value={{
        onFilterChange: handleFilterChange,
        onSearchChange: handleSearchChange,
        dummyCompanies: state.filteredCompanies,
        onApply: (startDate, endDate) =>
          handleDateRangeChange(startDate, endDate),
        onDelete: handleCompanyDeletion,
      }}
    >
      {dummyCompanies.length === 0 ? (
        <p className={classes["no-data-message"]}>
          There are no freelancers right now!
        </p>
      ) : (
        <div className={classes["companies"]}>
          <div className={classes["header"]}>
            <div className={classes.titles}>
              <Headers />
            </div>
            <div className={classes.filters}>
              <Filteration />
            </div>
          </div>
          <div className="companies-table">
            <CompaniesTable />
          </div>
        </div>
      )}
    </CompaniesContext.Provider>
  );
}

export default Companies;

import React, { createContext, useReducer } from "react";
import FAQsTable from "./faqs-table/FAQsTable";
import classes from "./faq.module.css";
import { dummyFAQs } from "./data";
import Headers from "./headings/Headers";
import Filteration from "./filteration/Filteration";
import { Outlet, useLocation } from "react-router-dom";

export const FAQsContext = createContext();

const FAQsReducer = (state, action) => {
  switch (action.type) {
    case "SET_FILTER": {
      const { filterType, filterValue } = action.payload;

      const updatedFilters = {
        ...state.filters,
        [filterType]: filterValue,
      };

      const filteredFAQs = dummyFAQs.filter((faq) =>
        Object.entries(updatedFilters).every(([key, value]) => {
          if (value.startsWith("all-") || !value) return true;
          const faqValue = faq[key]?.toLowerCase() || "";
          return faqValue === value.toLowerCase();
        })
      );

      return { ...state, filters: updatedFilters, filteredFAQs };
    }

    case "SET_SEARCH": {
      const searchQuery = action.payload;

      const filteredFAQs = dummyFAQs.filter((faq) => {
        const question = faq.question?.toLowerCase() || "";
        const query = searchQuery.toLowerCase();

        return question.includes(query);
      });

      return { ...state, searchQuery, filteredFAQs };
    }

    case "SET_DATE_RANGE": {
      const { startDate, endDate } = action.payload;

      const filteredByDate = dummyFAQs.filter((faq) => {
        const createdOn = new Date(faq.createdOn);
        if (startDate && createdOn < new Date(startDate)) return false;
        if (endDate && createdOn > new Date(endDate)) return false;
        return true;
      });

      return {
        ...state,
        dateRange: { startDate, endDate },
        filteredFAQs: filteredByDate,
      };
    }

    case "SET_SORT": {
      const { sortBy, sortOrder } = action.payload;

      const sortedFAQs = [...state.filteredFAQs].sort((a, b) => {
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
        filteredFAQs: sortedFAQs,
      };
    }

    case "ADD_FAQ": {
      const newFAQ = action.payload;
      return {
        ...state,
        filteredFAQs: [...state.filteredFAQs, newFAQ],
      };
    }

    case "UPDATE_FAQ": {
      const updatedFAQ = action.payload;
      const updatedFAQs = state.filteredFAQs.map((faq) =>
        faq.faqId === updatedFAQ.faqId ? updatedFAQ : faq
      );
      return { ...state, filteredFAQs: updatedFAQs };
    }

    case "DELETE_FAQ": {
      const updatedFAQs = state.filteredFAQs.filter(
        (faq) => faq.faqId !== action.payload
      );
      return { ...state, filteredFAQs: updatedFAQs };
    }

    default:
      console.error(`Unknown action type: ${action.type}`);
      return state;
  }
};

function FAQs() {
  const location = useLocation();
  const isAddFAQRoute = location.pathname.endsWith("add-faq");
  const isUpdateFAQRoute = location.pathname.includes("update-faq");

  const initialState = {
    filters: {},
    searchQuery: "",
    dateRange: { startDate: null, endDate: null },
    filteredFAQs: dummyFAQs,
    sortBy: null,
    sortOrder: "asc",
  };

  const [state, dispatch] = useReducer(FAQsReducer, initialState);

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

  const handleAddFAQ = (newFAQ) => {
    dispatch({ type: "ADD_FAQ", payload: newFAQ });
  };

  const handleUpdateFAQ = (updatedFAQ) => {
    dispatch({ type: "UPDATE_FAQ", payload: updatedFAQ });
  };

  const handleFAQDeletion = (faqId) => {
    if (
      window.confirm(
        `Are you sure you want to delete this company with id ${faqId} ?`
      )
    ) {
      dispatch({ type: "DELETE_FAQ", payload: faqId });
    }
  };

  return (
    <FAQsContext.Provider
      value={{
        onFilterChange: handleFilterChange,
        onSearchChange: handleSearchChange,
        dummyFAQs: state.filteredFAQs,
        onApply: (startDate, endDate) =>
          handleDateRangeChange(startDate, endDate),
        onAddFAQ: handleAddFAQ,
        onUpdateFAQ: handleUpdateFAQ,
        onDelete: handleFAQDeletion,
        onSortChange: handleSortChange,
        sortBy: state.sortBy,
        sortOrder: state.sortOrder,
      }}
    >
      <div className={classes["faqs"]}>
        {!isAddFAQRoute && !isUpdateFAQRoute && dummyFAQs.length === 0 ? (
          <p className={classes["no-data-message"]}>
            There are no FAQs right now!
          </p>
        ) : (
          <>
            {!isAddFAQRoute && !isUpdateFAQRoute && (
              <>
                <div className={classes["header"]}>
                  <div className={classes.titles}>
                    <Headers />
                  </div>
                  <div className={classes.filters}>
                    <Filteration />
                  </div>
                </div>
                <div className="faqs-table">
                  <FAQsTable />
                </div>
              </>
            )}
            <Outlet />
          </>
        )}
      </div>
    </FAQsContext.Provider>
  );
}

export default FAQs;

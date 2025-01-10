import React, { createContext, useReducer } from "react";
import APGSPPTSCPTable from "./apgsppttcp-table/APGSPPTSCP_Table";
import classes from "./apgsppttcp.module.css";
import { dummyAPGSPPTSCP } from "./data";
import Headers from "./headings/Headers";
import Filteration from "./filteration/Filteration";
import { Outlet, useLocation } from "react-router-dom";

export const APGSPPTSCP_Context = createContext();

const APGSPPTSCP_Reducer = (state, action) => {
  switch (action.type) {
    case "SET_FILTER": {
      const { filterType, filterValue } = action.payload;

      const updatedFilters = {
        ...state.filters,
        [filterType]: filterValue,
      };

      const filteredPages = dummyAPGSPPTSCP.filter((page) =>
        Object.entries(updatedFilters).every(([key, value]) => {
          if (value.startsWith("all-") || !value) return true;
          const pageValue = page[key]?.toLowerCase() || "";
          return pageValue === value.toLowerCase();
        })
      );

      return { ...state, filters: updatedFilters, filteredPages };
    }

    case "SET_SORT": {
      const { sortBy, sortOrder } = action.payload;

      const sortedPages = [...state.filteredPages].sort((a, b) => {
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
        filteredPages: sortedPages,
      };
    }

    case "ADD_PAGE": {
      const newpage = action.payload;
      return {
        ...state,
        filteredPages: [...state.filteredPages, newpage],
      };
    }

    case "UPDATE_PAGE": {
      const updatedpage = action.payload;
      const updatedPages = state.filteredPages.map((page) =>
        page.pageId === updatedpage.pageId ? updatedpage : page
      );
      return { ...state, filteredPages: updatedPages };
    }

    case "DELETE_APGSPPTSCP": {
      const { pageId, iterationId } = action.payload;

      const updatedPages = state.filteredPages.map((page) => {
        if (page.pageId === pageId) {
          // Filter out the specific iteration based on iterationId
          page.iterations = page.iterations.filter(
            (iteration) => iteration.id !== iterationId
          );
        }
        return page;
      });

      return { ...state, filteredPages: updatedPages };
    }

    default:
      console.error(`Unknown action type: ${action.type}`);
      return state;
  }
};

function APGSPPTSCP() {
  const location = useLocation();
  const isAddAPGSPPTSCPRoute = location.pathname.endsWith("add-apgsppttcp");
  const isUpdateAPGSPPTSCPRoute =
    location.pathname.includes("update-apgspptscp");

  const initialState = {
    filters: {},
    searchQuery: "",
    dateRange: { startDate: null, endDate: null },
    filteredPages: dummyAPGSPPTSCP,
    sortBy: null,
    sortOrder: "asc",
  };

  const [state, dispatch] = useReducer(APGSPPTSCP_Reducer, initialState);

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

  const handleAddPage = (newAPGSPPTSCP) => {
    dispatch({ type: "ADD_PAGE", payload: newAPGSPPTSCP });
  };

  const handleUpdatePage = (updateAPGSPPTSCP) => {
    dispatch({ type: "UPDATE_PAGE", payload: updateAPGSPPTSCP });
  };

  const handlePageDeletion = (pageId, iterationId) => {
    if (
      window.confirm(
        `Are you sure you want to delete this iteration with ID ${iterationId} from company with ID ${pageId}?`
      )
    ) {
      dispatch({
        type: "DELETE_APGSPPTSCP",
        payload: { pageId, iterationId },
      });
    }
  };

  return (
    <APGSPPTSCP_Context.Provider
      value={{
        onFilterChange: handleFilterChange,
        onSearchChange: handleSearchChange,
        dummyAPGSPPTSCP: state.filteredPages,
        onApply: (startDate, endDate) =>
          handleDateRangeChange(startDate, endDate),
        onAddAddPage: handleAddPage,
        onUpdatePage: handleUpdatePage,
        onDelete: handlePageDeletion,
        onSortChange: handleSortChange,
        sortBy: state.sortBy,
        sortOrder: state.sortOrder,
      }}
    >
      <div className={classes["apgsppttcp"]}>
        {!isAddAPGSPPTSCPRoute &&
        !isUpdateAPGSPPTSCPRoute &&
        dummyAPGSPPTSCP.length === 0 ? (
          <p className={classes["no-data-message"]}>
            There are no APGSPPTSCP right now!
          </p>
        ) : (
          <>
            {!isAddAPGSPPTSCPRoute && !isUpdateAPGSPPTSCPRoute && (
              <>
                <div className={classes["header"]}>
                  <div className={classes.titles}>
                    <Headers />
                  </div>
                  <div className={classes.filters}>
                    <Filteration />
                  </div>
                </div>
                <div className="APGSPPTSCP-table">
                  <APGSPPTSCPTable />
                </div>
              </>
            )}
            <Outlet />
          </>
        )}
      </div>
    </APGSPPTSCP_Context.Provider>
  );
}

export default APGSPPTSCP;

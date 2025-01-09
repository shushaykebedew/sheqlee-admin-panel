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

      const filteredAPGSPPTSCP = dummyAPGSPPTSCP.filter((apgsppttcp) =>
        Object.entries(updatedFilters).every(([key, value]) => {
          if (value.startsWith("all-") || !value) return true;
          const apgsppttcpValue = apgsppttcp[key]?.toLowerCase() || "";
          return apgsppttcpValue === value.toLowerCase();
        })
      );

      return { ...state, filters: updatedFilters, filteredAPGSPPTSCP };
    }

    case "SET_SORT": {
      const { sortBy, sortOrder } = action.payload;

      const sortedAPGSPPTSCP = [...state.filteredAPGSPPTSCP].sort((a, b) => {
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
        filteredAPGSPPTSCP: sortedAPGSPPTSCP,
      };
    }

    case "ADD_APGSPPTSCP": {
      const newapgsppttcp = action.payload;
      return {
        ...state,
        filteredAPGSPPTSCP: [...state.filteredAPGSPPTSCP, newapgsppttcp],
      };
    }

    case "UPDATE_APGSPPTSCP": {
      const updatedapgsppttcp = action.payload;
      const updatedAPGSPPTSCP = state.filteredAPGSPPTSCP.map((apgsppttcp) =>
        apgsppttcp.apgsppttcpId === updatedapgsppttcp.apgsppttcpId
          ? updatedapgsppttcp
          : apgsppttcp
      );
      return { ...state, filteredAPGSPPTSCP: updatedAPGSPPTSCP };
    }

    case "DELETE_APGSPPTSCP": {
      const { apgsppttcpId, iterationId } = action.payload;

      const updatedAPGSPPTSCP = state.filteredAPGSPPTSCP.map((apgsppttcp) => {
        if (apgsppttcp.apgsppttcpId === apgsppttcpId) {
          // Filter out the specific iteration based on iterationId
          apgsppttcp.iterations = apgsppttcp.iterations.filter(
            (iteration) => iteration.id !== iterationId
          );
        }
        return apgsppttcp;
      });

      return { ...state, filteredAPGSPPTSCP: updatedAPGSPPTSCP };
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
    location.pathname.includes("update-apgsppttcp");

  const initialState = {
    filters: {},
    searchQuery: "",
    dateRange: { startDate: null, endDate: null },
    filteredAPGSPPTSCP: dummyAPGSPPTSCP,
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

  const handleAddAPGSPPTSCP = (newAPGSPPTSCP) => {
    dispatch({ type: "ADD_APGSPPTSCP", payload: newAPGSPPTSCP });
  };

  const handleUpdateAPGSPPTSCP = (updateAPGSPPTSCP) => {
    dispatch({ type: "UPDATE_APGSPPTSCP", payload: updateAPGSPPTSCP });
  };

  const handleAPGSPPTSCPDeletion = (apgsppttcpId, iterationId) => {
    if (
      window.confirm(
        `Are you sure you want to delete this iteration with ID ${iterationId} from company with ID ${apgsppttcpId}?`
      )
    ) {
      dispatch({
        type: "DELETE_APGSPPTSCP",
        payload: { apgsppttcpId, iterationId },
      });
    }
  };

  return (
    <APGSPPTSCP_Context.Provider
      value={{
        onFilterChange: handleFilterChange,
        onSearchChange: handleSearchChange,
        dummyAPGSPPTSCP: state.filteredAPGSPPTSCP,
        onApply: (startDate, endDate) =>
          handleDateRangeChange(startDate, endDate),
        onAddAddAPGSPPTSCP: handleAddAPGSPPTSCP,
        onUpdateAddAPGSPPTSCP: handleUpdateAPGSPPTSCP,
        onDelete: handleAPGSPPTSCPDeletion,
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

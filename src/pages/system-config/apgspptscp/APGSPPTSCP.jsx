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
      const { filterValue } = action.payload;

      const filteredPages = dummyAPGSPPTSCP.filter((page) => {
        if (
          !filterValue ||
          filterValue === "Doc Type" ||
          filterValue === "all-options"
        ) {
          return true;
        }
        return page.pageTitle.toLowerCase() === filterValue.toLowerCase();
      });

      return {
        ...state,
        filterValue,
        filteredPages,
      };
    }

    case "ADD_NEW_ITERATION": {
      const { pageId, newIteration } = action.payload;

      const updatedPages = state.filteredPages.map((page) =>
        page.pageId === pageId
          ? {
              ...page,
              iterations: [...page.iterations, newIteration],
            }
          : page
      );

      return {
        ...state,
        filteredPages: updatedPages,
      };
    }
    case "DELETE_PAGE": {
      const { pageId, iterationId } = action.payload;

      const updatedPages = state.filteredPages
        .map((page) => {
          if (page.pageId === pageId) {
            const updatedIterations = page.iterations.filter(
              (iteration) => iteration.id !== iterationId
            );

            // If no iterations remain, remove the entire page
            return updatedIterations.length > 0
              ? { ...page, iterations: updatedIterations }
              : null;
          }
          return page;
        })
        .filter(Boolean); // Remove null values if entire pages are deleted

      return {
        ...state,
        filteredPages: updatedPages,
      };
    }
    default:
      console.error(`Unknown action type: ${action.type}`);
      return state;
  }
};

function APGSPPTSCP() {
  const location = useLocation();
  const isReadAPGSPPTSCPRoute = location.pathname.includes("read-apgspptscp");
  const isUpdateAPGSPPTSCPRoute =
    location.pathname.includes("update-apgspptscp");

  const initialState = {
    filterValue: "",
    filteredPages: dummyAPGSPPTSCP,
  };

  const [state, dispatch] = useReducer(APGSPPTSCP_Reducer, initialState);

  const handleFilterChange = (filterValue) => {
    dispatch({ type: "SET_FILTER", payload: { filterValue } });
  };
  const handleDelete = (pageId, iterationId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this iteration?"
    );
    if (isConfirmed) {
      dispatch({ type: "DELETE_PAGE", payload: { pageId, iterationId } });
    }
  };

  return (
    <APGSPPTSCP_Context.Provider
      value={{
        onFilterChange: handleFilterChange,
        dummyAPGSPPTSCP: state.filteredPages,
        dispatch,
        onDelete: handleDelete,
      }}
    >
      <div className={classes["apgsppttcp"]}>
        {!isReadAPGSPPTSCPRoute &&
        !isUpdateAPGSPPTSCPRoute &&
        dummyAPGSPPTSCP.length === 0 ? (
          <p className={classes["no-data-message"]}>
            There are no APGSPPTSCP right now!
          </p>
        ) : (
          <>
            {!isReadAPGSPPTSCPRoute && !isUpdateAPGSPPTSCPRoute && (
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

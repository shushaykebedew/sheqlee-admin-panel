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
    filterValue: "",
    filteredPages: dummyAPGSPPTSCP,
  };

  const [state, dispatch] = useReducer(APGSPPTSCP_Reducer, initialState);

  const handleFilterChange = (filterValue) => {
    dispatch({ type: "SET_FILTER", payload: { filterValue } });
  };

  return (
    <APGSPPTSCP_Context.Provider
      value={{
        onFilterChange: handleFilterChange,
        dummyAPGSPPTSCP: state.filteredPages,
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

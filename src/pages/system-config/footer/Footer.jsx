import React, { createContext, useReducer } from "react";
import FooterTable from "./footer-table/FooterTable";
import classes from "./footer.module.css";
import { footerData } from "./data";
import Headers from "./headings/Headers";
import { Outlet, useLocation } from "react-router-dom";

export const FooterContext = createContext();

const FooterReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SECTION": {
      const updatedSection = action.payload;
      const updatedSections = state.filteredSection.map((section) =>
        section.sectionId === updatedSection.sectionId
          ? updatedSection
          : section
      );
      return { ...state, filteredSection: updatedSections };
    }

    case "DELETE_SECTION": {
      const updatedSections = state.filteredSection.filter(
        (section) => section.sectionId !== action.payload
      );
      return { ...state, filteredSection: updatedSections };
    }

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

function Footer() {
  const location = useLocation();
  const isUpdateFooterRoute = location.pathname.includes("update-footer");

  const initialState = {
    filters: {},
    filteredSection: footerData,
  };

  const [state, dispatch] = useReducer(FooterReducer, initialState);

  const handleUpdateSection = (updatedSection) => {
    dispatch({ type: "UPDATE_SECTION", payload: updatedSection });
  };

  const handleSectionDeletion = (sectionId) => {
    if (
      window.confirm(
        `Are you sure you want to delete this section with id ${sectionId}?`
      )
    ) {
      dispatch({ type: "DELETE_SECTION", payload: sectionId });
    }
  };

  const contextValue = {
    footerData: state.filteredSection,
    onUpdateSection: handleUpdateSection,
    onDelete: handleSectionDeletion,
  };

  const isFooterEmpty = state.filteredSection.length === 0;

  return (
    <FooterContext.Provider value={contextValue}>
      <div className={classes.footer}>
        {isFooterEmpty && !isUpdateFooterRoute ? (
          <p className={classes["no-data-message"]}>
            There are no Footer sections right now!
          </p>
        ) : (
          <>
            {!isUpdateFooterRoute && (
              <>
                <div className={classes.header}>
                  <div className={classes.titles}>
                    <Headers />
                  </div>
                </div>
                <div className={classes["footer-table-container"]}>
                  <FooterTable />
                </div>
              </>
            )}
            <Outlet />
          </>
        )}
      </div>
    </FooterContext.Provider>
  );
}

export default Footer;

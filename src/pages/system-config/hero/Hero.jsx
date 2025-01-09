import React, { createContext, useReducer } from "react";
import HeroTable from "./hero-table/HeroTable";
import classes from "./hero.module.css";
import { heroData } from "./data";
import Headers from "./headings/Headers";
import { Outlet, useLocation } from "react-router-dom";

export const HeroContext = createContext();

const HeroReducer = (state, action) => {
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

function Hero() {
  const location = useLocation();
  const isUpdateHeroRoute = location.pathname.includes("update-hero");

  const initialState = {
    filters: {},
    filteredSection: heroData,
  };

  const [state, dispatch] = useReducer(HeroReducer, initialState);

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
    heroData: state.filteredSection,
    onUpdateSection: handleUpdateSection,
    onDelete: handleSectionDeletion,
  };

  const isHeroEmpty = state.filteredSection.length === 0;

  return (
    <HeroContext.Provider value={contextValue}>
      <div className={classes.hero}>
        {isHeroEmpty && !isUpdateHeroRoute ? (
          <p className={classes["no-data-message"]}>
            There are no Hero sections right now!
          </p>
        ) : (
          <>
            {!isUpdateHeroRoute && (
              <>
                <div className={classes.header}>
                  <div className={classes.titles}>
                    <Headers />
                  </div>
                </div>
                <div className={classes["hero-table-container"]}>
                  <HeroTable />
                </div>
              </>
            )}
            <Outlet />
          </>
        )}
      </div>
    </HeroContext.Provider>
  );
}

export default Hero;

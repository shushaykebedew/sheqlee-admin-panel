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
      const updatedSections =
        action.type === "ADD_SECTION"
          ? [...state.filteredSection, action.payload]
          : state.filteredSection.map((section) =>
              section.sectionId === action.payload.sectionId
                ? action.payload
                : section
            );
      return { ...state, filteredSection: updatedSections };
    }

    case "DELETE_SECTION": {
      return {
        ...state,
        filteredSection: state.filteredSection.filter(
          (section) => section.sectionId !== action.payload
        ),
      };
    }

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

function Hero() {
  const location = useLocation();
  const isUpdateHeroRoute = location.pathname.includes("update-hero");

  const initialState = { filters: {}, filteredSection: heroData };
  const [state, dispatch] = useReducer(HeroReducer, initialState);

  const handleAction = (type, payload) => dispatch({ type, payload });

  const contextValue = {
    heroData: state.filteredSection,
    onUpdateSection: (updatedSection) =>
      handleAction("UPDATE_SECTION", updatedSection),
    onDelete: (sectionId) => {
      if (
        window.confirm(
          `Are you sure you want to delete section with ID ${sectionId}?`
        )
      ) {
        handleAction("DELETE_SECTION", sectionId);
      }
    },
  };

  const isHeroEmpty = state.filteredSection.length === 0;

  const renderContent = () => {
    if (isUpdateHeroRoute) {
      return <Outlet />;
    }

    if (isHeroEmpty) {
      return (
        <p className={classes["no-data-message"]}>
          There are no Hero sections right now!
        </p>
      );
    }

    return (
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
    );
  };

  return (
    <HeroContext.Provider value={contextValue}>
      <div className={classes.hero}>{renderContent()}</div>
    </HeroContext.Provider>
  );
}

export default Hero;

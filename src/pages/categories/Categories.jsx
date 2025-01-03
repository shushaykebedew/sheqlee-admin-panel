import React, { createContext, useReducer } from "react";
import CategoriesTable from "./categories-table/CategoriesTable";
import classes from "./categories.module.css";
import { dummyCategories } from "./data";
import Headers from "./headings/Headers";
import Filteration from "./filteration/Filteration";
import { Outlet, useLocation } from "react-router-dom";

export const CategoriesContext = createContext();

const CategoriesReducer = (state, action) => {
  switch (action.type) {
    case "SET_FILTER": {
      const { filterType, filterValue } = action.payload;

      const updatedFilters = {
        ...state.filters,
        [filterType]: filterValue,
      };

      const filteredCategories = dummyCategories.filter((category) =>
        Object.entries(updatedFilters).every(([key, value]) => {
          if (value.startsWith("all-") || !value) return true;
          const categoryValue = category[key]?.toLowerCase() || "";
          return categoryValue === value.toLowerCase();
        })
      );

      return { ...state, filters: updatedFilters, filteredCategories };
    }

    case "SET_SEARCH": {
      const searchQuery = action.payload;

      const filteredCategories = dummyCategories.filter((category) => {
        const title = category.title?.toLowerCase() || "";
        const categoryTags = category.tags?.toLowerCase() || "";
        const query = searchQuery.toLowerCase();

        return title.includes(query) || categoryTags.includes(query);
      });

      return { ...state, searchQuery, filteredCategories };
    }

    case "SET_DATE_RANGE": {
      const { startDate, endDate } = action.payload;

      const filteredByDate = dummyCategories.filter((category) => {
        const createdOn = new Date(category.createdOn);
        if (startDate && createdOn < new Date(startDate)) return false;
        if (endDate && createdOn > new Date(endDate)) return false;
        return true;
      });

      return {
        ...state,
        dateRange: { startDate, endDate },
        filteredCategories: filteredByDate,
      };
    }

    case "DELETE_CATEGORY": {
      const updatedCategories = state.filteredCategories.filter(
        (category) => category.catId !== action.payload
      );
      return { ...state, filteredCategories: updatedCategories };
    }

    default:
      console.error(`Unknown action type: ${action.type}`);
      return state;
  }
};

function Categories() {
  const location = useLocation();
  const isAddCategoryRoute = location.pathname.endsWith("add-category");

  const initialState = {
    filters: {},
    searchQuery: "",
    dateRange: { startDate: null, endDate: null },
    filteredCategories: dummyCategories,
  };

  const [state, dispatch] = useReducer(CategoriesReducer, initialState);

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

  const handleCategoryDeletion = (catId) => {
    if (
      window.confirm(
        `Are you sure you want to delete this company with id ${catId} ?`
      )
    ) {
      dispatch({ type: "DELETE_CATEGORY", payload: catId });
    }
  };

  return (
    <CategoriesContext.Provider
      value={{
        onFilterChange: handleFilterChange,
        onSearchChange: handleSearchChange,
        dummyCategories: state.filteredCategories,
        onApply: (startDate, endDate) =>
          handleDateRangeChange(startDate, endDate),
        onDelete: handleCategoryDeletion,
      }}
    >
      <div className={classes["categories"]}>
        {!isAddCategoryRoute && dummyCategories.length === 0 ? (
          <p className={classes["no-data-message"]}>
            There are no categories right now!
          </p>
        ) : (
          <>
            {!isAddCategoryRoute && (
              <>
                <div className={classes["header"]}>
                  <div className={classes.titles}>
                    <Headers />
                  </div>
                  <div className={classes.filters}>
                    <Filteration />
                  </div>
                </div>
                <div className="categories-table">
                  <CategoriesTable />
                </div>
              </>
            )}
            <Outlet />
          </>
        )}
      </div>
    </CategoriesContext.Provider>
  );
}

export default Categories;

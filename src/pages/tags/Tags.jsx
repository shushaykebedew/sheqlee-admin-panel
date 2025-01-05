import React, { createContext, useReducer } from "react";
import TagsTable from "./tags-table/TagsTable";
import classes from "./tags.module.css";
import { dummyTags } from "./data";
import Headers from "./headings/Headers";
import Filteration from "./filteration/Filteration";
import { Outlet, useLocation } from "react-router-dom";

export const TagsContext = createContext();

const TagsReducer = (state, action) => {
  switch (action.type) {
    case "SET_FILTER": {
      const { filterType, filterValue } = action.payload;

      const updatedFilters = {
        ...state.filters,
        [filterType]: filterValue,
      };

      const filteredTags = dummyTags.filter((tag) =>
        Object.entries(updatedFilters).every(([key, value]) => {
          if (value.startsWith("all-") || !value) return true;
          const tagValue = tag[key]?.toLowerCase() || "";
          return tagValue === value.toLowerCase();
        })
      );

      return { ...state, filters: updatedFilters, filteredTags };
    }

    case "SET_SEARCH": {
      const searchQuery = action.payload;

      const filteredTags = dummyTags.filter((tag) => {
        const title = tag.title?.toLowerCase() || "";
        const query = searchQuery.toLowerCase();
        return title.includes(query);
      });

      return { ...state, searchQuery, filteredTags };
    }

    case "SET_DATE_RANGE": {
      const { startDate, endDate } = action.payload;

      const filteredByDate = dummyTags.filter((tag) => {
        const createdOn = new Date(tag.createdOn);
        if (startDate && createdOn < new Date(startDate)) return false;
        if (endDate && createdOn > new Date(endDate)) return false;
        return true;
      });

      return {
        ...state,
        dateRange: { startDate, endDate },
        filteredTags: filteredByDate,
      };
    }

    case "SET_SORT": {
      const { sortBy, sortOrder } = action.payload;

      const sortedTags = [...state.filteredTags].sort((a, b) => {
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
        filteredTags: sortedTags,
      };
    }

    case "ADD_TAG": {
      const newTag = action.payload;
      return {
        ...state,
        filteredTags: [...state.filteredTags, newTag],
      };
    }

    case "UPDATE_TAG": {
      const updatedTag = action.payload;
      const updatedTags = state.filteredTags.map((tag) =>
        tag.tagId === updatedTag.tagId ? updatedTag : tag
      );
      return { ...state, filteredTags: updatedTags };
    }

    case "DELETE_TAG": {
      const updatedTags = state.filteredTags.filter(
        (tag) => tag.tagId !== action.payload
      );
      return { ...state, filteredTags: updatedTags };
    }

    default:
      console.error(`Unknown action type: ${action.type}`);
      return state;
  }
};

function Tags() {
  const location = useLocation();
  const isAddTagRoute = location.pathname.endsWith("add-tag");
  const isUpdateTagRoute = location.pathname.includes("update-tag");

  const initialState = {
    filters: {},
    searchQuery: "",
    dateRange: { startDate: null, endDate: null },
    filteredTags: dummyTags,
    sortBy: null,
    sortOrder: "asc",
  };

  const [state, dispatch] = useReducer(TagsReducer, initialState);

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

  const handleAddTag = (newTag) => {
    dispatch({ type: "ADD_TAG", payload: newTag });
  };

  const handleUpdateTag = (updatedTag) => {
    dispatch({ type: "UPDATE_TAG", payload: updatedTag });
  };

  const handleTagDeletion = (tagId) => {
    if (
      window.confirm(
        `Are you sure you want to delete this company with id ${tagId} ?`
      )
    ) {
      dispatch({ type: "DELETE_TAG", payload: tagId });
    }
  };

  return (
    <TagsContext.Provider
      value={{
        onFilterChange: handleFilterChange,
        onSearchChange: handleSearchChange,
        dummyTags: state.filteredTags,
        onApply: (startDate, endDate) =>
          handleDateRangeChange(startDate, endDate),
        onAddTag: handleAddTag,
        onUpdate: handleUpdateTag,
        onDelete: handleTagDeletion,
        onSortChange: handleSortChange,
        sortBy: state.sortBy,
        sortOrder: state.sortOrder,
      }}
    >
      <div className={classes["tags"]}>
        {!isAddTagRoute && !isUpdateTagRoute && dummyTags.length === 0 ? (
          <p className={classes["no-data-message"]}>
            There are no Tags right now!
          </p>
        ) : (
          <>
            {!isAddTagRoute && !isUpdateTagRoute && (
              <>
                <div className={classes["header"]}>
                  <div className={classes.titles}>
                    <Headers />
                  </div>
                  <div className={classes.filters}>
                    <Filteration />
                  </div>
                </div>
                <div className="tags-table">
                  <TagsTable />
                </div>
              </>
            )}
            <Outlet />
          </>
        )}
      </div>
    </TagsContext.Provider>
  );
}

export default Tags;

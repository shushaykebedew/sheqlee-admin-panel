import { createContext, useReducer } from "react";
import JobPostsTable from "./job-posts-table/JobPostsTable";
import classes from "./jobposts.module.css";
import { dummyJobPosts } from "./data";
import Filteration from "./filteration/Filteration";

export const JobsContext = createContext();

const jobPostsReducer = (state, action) => {
  switch (action.type) {
    case "SET_FILTER": {
      const { filterType, filterValue } = action.payload;

      const updatedFilters = {
        ...state.filters,
        [filterType]: filterValue,
      };

      const filteredJobs = dummyJobPosts.filter((jobPost) =>
        Object.entries(updatedFilters).every(([key, value]) => {
          if (value.startsWith("all-") || !value) return true;
          const jobValue = jobPost[key]?.toLowerCase() || "";
          return jobValue === value.toLowerCase();
        })
      );

      return { ...state, filters: updatedFilters, filteredJobs };
    }

    case "SET_SEARCH": {
      const searchQuery = action.payload;

      const filteredJobs = dummyJobPosts.filter((jobPost) => {
        const jobTitle = jobPost.title?.toLowerCase() || "";
        const companyName = jobPost.company?.toLowerCase() || "";
        const query = searchQuery.toLowerCase();

        return jobTitle.includes(query) || companyName.includes(query);
      });

      return { ...state, searchQuery, filteredJobs };
    }

    case "SET_DATE_RANGE": {
      const { startDate, endDate } = action.payload;

      const filteredByDate = dummyJobPosts.filter((jobPost) => {
        const jobDate = new Date(jobPost.postDate);
        if (startDate && jobDate < new Date(startDate)) return false;
        if (endDate && jobDate > new Date(endDate)) return false;
        return true;
      });

      return {
        ...state,
        dateRange: { startDate, endDate },
        filteredJobs: filteredByDate,
      };
    }

    case "DELETE_POST": {
      const updatedJobs = state.filteredJobs.filter(
        (jobPost) => jobPost.id !== action.payload
      );
      return { ...state, filteredJobs: updatedJobs };
    }

    default:
      console.error(`Unknown action type: ${action.type}`);
      return state;
  }
};

function JobPosts() {
  const initialState = {
    filters: {},
    searchQuery: "",
    dateRange: { startDate: null, endDate: null },
    filteredJobs: dummyJobPosts,
  };

  const [state, dispatch] = useReducer(jobPostsReducer, initialState);

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

  const handleJobPostDelete = (id) => {
    if (
      window.confirm(
        `Are you sure you want to delete this job post with id ${id} ?`
      )
    ) {
      dispatch({ type: "DELETE_POST", payload: id });
    }
  };

  return (
    <JobsContext.Provider
      value={{
        onFilterChange: handleFilterChange,
        onSearchChange: handleSearchChange,
        dummyJobPosts: state.filteredJobs,
        onApply: (startDate, endDate) =>
          handleDateRangeChange(startDate, endDate),
        onDelete: handleJobPostDelete,
      }}
    >
      {dummyJobPosts.length === 0 ? (
        <p className={classes["no-data-message"]}>
          {" "}
          There are no job posts right now!
        </p>
      ) : (
        <div className={classes["job-posts"]}>
          <div className={classes["filters"]}>
            <Filteration />
          </div>
          <div className="job-posts-table">
            <JobPostsTable />
          </div>
        </div>
      )}
    </JobsContext.Provider>
  );
}

export default JobPosts;

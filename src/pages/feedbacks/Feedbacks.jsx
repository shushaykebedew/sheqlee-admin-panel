import React, { createContext, useReducer } from "react";
import classes from "./feedbacks.module.css";
import { dummyFeedbacks } from "./data";
import Headers from "./Headers";
import Filteration from "./filteration/Filteration";
import FeedbacksTable from "./feedbacks-table/FeedbacksTable";

export const FeedbacksContext = createContext();

const FeedbacksReducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH": {
      const searchQuery = action.payload;

      const filteredFeedbacks = dummyFeedbacks.filter((feedback) => {
        const feedbackMessage = feedback.message?.toLowerCase() || "";

        const query = searchQuery.toLowerCase();

        return feedbackMessage.includes(query);
      });

      return { ...state, searchQuery, filteredFeedbacks };
    }

    case "SET_DATE_RANGE": {
      const { startDate, endDate } = action.payload;

      const filteredByDate = dummyFeedbacks.filter((feedback) => {
        const regDate = new Date(feedback.regDate);
        if (startDate && regDate < new Date(startDate)) return false;
        if (endDate && regDate > new Date(endDate)) return false;
        return true;
      });

      return {
        ...state,
        dateRange: { startDate, endDate },
        filteredFeedbacks: filteredByDate,
      };
    }

    case "DELETE_FEEDBACK": {
      const updatedFeedbacks = state.filteredFeedbacks.filter(
        (feedback) => feedback.feId !== action.payload
      );
      return { ...state, filteredFeedbacks: updatedFeedbacks };
    }

    default:
      console.error(`Unknown action type: ${action.type}`);
      return state;
  }
};

function Feedbacks() {
  const initialState = {
    filters: {},
    searchQuery: "",
    dateRange: { startDate: null, endDate: null },
    filteredFeedbacks: dummyFeedbacks,
    sortBy: null,
    sortOrder: "asc",
  };

  const [state, dispatch] = useReducer(FeedbacksReducer, initialState);

  const handleSearchChange = (searchValue) => {
    dispatch({ type: "SET_SEARCH", payload: searchValue });
  };

  const handleDateRangeChange = (startDate, endDate) => {
    dispatch({ type: "SET_DATE_RANGE", payload: { startDate, endDate } });
  };

  const handleFeedbackDeletion = (feId) => {
    if (
      window.confirm(
        `Are you sure you want to delete this feedback with id ${feId} ?`
      )
    ) {
      dispatch({ type: "DELETE_FEEDBACK", payload: feId });
    }
  };

  return (
    <FeedbacksContext.Provider
      value={{
        onSearchChange: handleSearchChange,
        dummyFeedbacks: state.filteredFeedbacks,
        onApply: (startDate, endDate) =>
          handleDateRangeChange(startDate, endDate),
        onDelete: handleFeedbackDeletion,
      }}
    >
      {dummyFeedbacks.length === 0 ? (
        <p className={classes["no-data-message"]}>
          {" "}
          There are no Feedbacks right now!
        </p>
      ) : (
        <div className={classes["feedbacks"]}>
          <div className={classes["header"]}>
            <div className={classes.titles}>
              <Headers />
            </div>
            <div className={classes.filters}>
              <Filteration />
            </div>
          </div>
          <div className="feedbacks-table">
            <FeedbacksTable />
          </div>
        </div>
      )}
    </FeedbacksContext.Provider>
  );
}

export default Feedbacks;

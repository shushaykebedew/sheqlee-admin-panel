import React, { createContext, useReducer } from "react";
import TestimonialsTable from "./testimonials-table/TestimonialsTable";
import classes from "./testimonials.module.css";
import { dummyTestimonials } from "./data";
import Headers from "./headings/Headers";
import { Outlet, useLocation } from "react-router-dom";

export const TestimonialsContext = createContext();

const TestimonialsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TESTIMONIAL": {
      const newTestimonial = action.payload;
      return {
        ...state,
        filteredTestimonials: [...state.filteredTestimonials, newTestimonial],
      };
    }

    case "UPDATE_TESTIMONIAL": {
      const updatedTestimonial = action.payload;
      const updatedTestimonials = state.filteredTestimonials.map(
        (testimonial) =>
          testimonial.testimonialId === updatedTestimonial.testimonialId
            ? updatedTestimonial
            : testimonial
      );
      return { ...state, filteredTestimonials: updatedTestimonials };
    }

    case "DELETE_TESTIMONIAL": {
      const updatedTestimonials = state.filteredTestimonials.filter(
        (testimonial) => testimonial.testimonialId !== action.payload
      );
      return { ...state, filteredTestimonials: updatedTestimonials };
    }

    default:
      console.error(`Unknown action type: ${action.type}`);
      return state;
  }
};

function Testimonials() {
  const location = useLocation();
  const isAddTestimonialRoute = location.pathname.endsWith("add-Testimonial");
  const isUpdateTestimonialRoute =
    location.pathname.includes("update-testimonial");

  const initialState = {
    filters: {},
    filteredTestimonials: dummyTestimonials,
  };

  const [state, dispatch] = useReducer(TestimonialsReducer, initialState);

  const handleAddTestimonial = (newTestimonial) => {
    dispatch({ type: "ADD_TESTIMONIAL", payload: newTestimonial });
  };

  const handleUpdateTestimonial = (updatedTestimonial) => {
    dispatch({ type: "UPDATE_TESTIMONIAL", payload: updatedTestimonial });
  };

  const handleTestimonialDeletion = (testimonialId) => {
    if (
      window.confirm(
        `Are you sure you want to delete this company with id ${testimonialId} ?`
      )
    ) {
      dispatch({ type: "DELETE_TESTIMONIAL", payload: testimonialId });
    }
  };

  return (
    <TestimonialsContext.Provider
      value={{
        dummyTestimonials: state.filteredTestimonials,

        onAddTestimonial: handleAddTestimonial,
        onUpdateTestimonial: handleUpdateTestimonial,
        onDelete: handleTestimonialDeletion,
      }}
    >
      <div className={classes["testimonials"]}>
        {!isAddTestimonialRoute &&
        !isUpdateTestimonialRoute &&
        dummyTestimonials.length === 0 ? (
          <p className={classes["no-data-message"]}>
            There are no Testimonials right now!
          </p>
        ) : (
          <>
            {!isAddTestimonialRoute && !isUpdateTestimonialRoute && (
              <>
                <div className={classes["header"]}>
                  <div className={classes.titles}>
                    <Headers />
                  </div>
                </div>
                <div className="testimonials-table">
                  <TestimonialsTable />
                </div>
              </>
            )}
            <Outlet />
          </>
        )}
      </div>
    </TestimonialsContext.Provider>
  );
}

export default Testimonials;

import React, { createContext, useState, useContext } from "react";

// Create a context
const FilterContext = createContext();

// Create a provider component
export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    status: "", // default: empty string or 'all-status'
    action: "", // for example: 'active', 'inactive', etc.
    category: "",
    jobType: "",
    tags: "",
    skillLevel: "",
  });

  // Function to update the filter state
  const updateFilter = (filterKey, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value,
    }));
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to use filter context
export const useFilters = () => {
  return useContext(FilterContext);
};

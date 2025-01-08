import React, { createContext, useReducer } from "react";
import UsersTable from "./users-table/UsersTable";
import classes from "./users.module.css";
import { dummyUsers } from "./data";
import Headers from "./headings/Headers";
import Filteration from "./filteration/Filteration";
import { Outlet, useLocation } from "react-router-dom";

export const UsersContext = createContext();

const UsersReducer = (state, action) => {
  switch (action.type) {
    case "SET_FILTER": {
      const { filterType, filterValue } = action.payload;

      const updatedFilters = {
        ...state.filters,
        [filterType]: filterValue,
      };

      const filteredUsers = dummyUsers.filter((user) =>
        Object.entries(updatedFilters).every(([key, value]) => {
          if (value.startsWith("all-") || !value) return true;
          const userValue = user[key]?.toLowerCase() || "";
          return userValue === value.toLowerCase();
        })
      );

      return { ...state, filters: updatedFilters, filteredUsers };
    }

    case "SET_SEARCH": {
      const searchQuery = action.payload;

      const filteredUsers = dummyUsers.filter((user) => {
        const name = user.name?.toLowerCase() || "";
        const userEmail = user.email?.toLowerCase() || "";
        const query = searchQuery.toLowerCase();

        return name.includes(query) || userEmail.includes(query);
      });

      return { ...state, searchQuery, filteredUsers };
    }

    case "SET_DATE_RANGE": {
      const { startDate, endDate } = action.payload;

      const filteredByDate = dummyUsers.filter((user) => {
        const createdOn = new Date(user.createdOn);
        if (startDate && createdOn < new Date(startDate)) return false;
        if (endDate && createdOn > new Date(endDate)) return false;
        return true;
      });

      return {
        ...state,
        dateRange: { startDate, endDate },
        filteredUsers: filteredByDate,
      };
    }

    case "SET_SORT": {
      const { sortBy, sortOrder } = action.payload;

      const sortedUsers = [...state.filteredUsers].sort((a, b) => {
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
        filteredUsers: sortedUsers,
      };
    }

    case "ADD_USER": {
      const newUser = action.payload;
      return {
        ...state,
        filteredUsers: [...state.filteredUsers, newUser],
      };
    }

    case "UPDATE_USER": {
      const updatedUser = action.payload;
      const updatedUsers = state.filteredUsers.map((user) =>
        user.userId === updatedUser.userId ? updatedUser : user
      );
      return { ...state, filteredUsers: updatedUsers };
    }

    case "DELETE_USER": {
      const updatedUsers = state.filteredUsers.filter(
        (user) => user.userId !== action.payload
      );
      return { ...state, filteredUsers: updatedUsers };
    }

    default:
      console.error(`Unknown action type: ${action.type}`);
      return state;
  }
};

function Users() {
  const location = useLocation();
  const isAddUserRoute = location.pathname.endsWith("add-user");
  const isUpdateUserRoute = location.pathname.includes("update-user");

  const initialState = {
    filters: {},
    searchQuery: "",
    dateRange: { startDate: null, endDate: null },
    filteredUsers: dummyUsers,
    sortBy: null,
    sortOrder: "asc",
  };

  const [state, dispatch] = useReducer(UsersReducer, initialState);

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

  const handleAddUser = (newUser) => {
    dispatch({ type: "ADD_USER", payload: newUser });
  };

  const handleUpdateUser = (updatedUser) => {
    dispatch({ type: "UPDATE_USER", payload: updatedUser });
  };

  const handleUserDeletion = (userId) => {
    if (
      window.confirm(
        `Are you sure you want to delete this company with id ${userId} ?`
      )
    ) {
      dispatch({ type: "DELETE_USER", payload: userId });
    }
  };

  return (
    <UsersContext.Provider
      value={{
        onFilterChange: handleFilterChange,
        onSearchChange: handleSearchChange,
        dummyUsers: state.filteredUsers,
        onApply: (startDate, endDate) =>
          handleDateRangeChange(startDate, endDate),
        onAddUser: handleAddUser,
        onUpdateUser: handleUpdateUser,
        onDelete: handleUserDeletion,
        onSortChange: handleSortChange,
        sortBy: state.sortBy,
        sortOrder: state.sortOrder,
      }}
    >
      <div className={classes["users"]}>
        {!isAddUserRoute && !isUpdateUserRoute && dummyUsers.length === 0 ? (
          <p className={classes["no-data-message"]}>
            There are no Users right now!
          </p>
        ) : (
          <>
            {!isAddUserRoute && !isUpdateUserRoute && (
              <>
                <div className={classes["header"]}>
                  <div className={classes.titles}>
                    <Headers />
                  </div>
                  <div className={classes.filters}>
                    <Filteration />
                  </div>
                </div>
                <div className="users-table">
                  <UsersTable />
                </div>
              </>
            )}
            <Outlet />
          </>
        )}
      </div>
    </UsersContext.Provider>
  );
}

export default Users;

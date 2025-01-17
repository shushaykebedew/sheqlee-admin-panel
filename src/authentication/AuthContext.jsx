import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  });

  // Login user and save to localStorage
  const loginUser = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  // Logout user and clear localStorage
  const logoutUser = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
  };

  // Update user and save to localStorage
  const updateUser = (updatedUser) => {
    setCurrentUser((prevUser) => {
      const newUser = { ...prevUser, ...updatedUser };
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      return newUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loginUser,
        logoutUser,
        currentUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

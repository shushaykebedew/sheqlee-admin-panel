import { useState, useEffect } from "react";

function usePasswordValidation(passwordOne, passwordTwo = null) {
  const [passwordError, setPasswordError] = useState("");

  function validatePasswords() {
    if (passwordTwo) {
      if (passwordOne !== passwordTwo) {
        setPasswordError("Passwords do not match.");
        return false;
      }
    }

    if (passwordOne.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return false;
    }

    if (!/[A-Z]/.test(passwordOne)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      return false;
    }

    if (!/\d/.test(passwordOne)) {
      setPasswordError("Password must contain at least one number.");
      return false;
    }

    setPasswordError("");
    return true;
  }

  useEffect(() => {
    if (passwordOne) {
      validatePasswords();
    } else {
      setPasswordError("");
    }
  }, [passwordOne, passwordTwo]);

  return { passwordError };
}

export default usePasswordValidation;

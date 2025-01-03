import { useState } from "react";

function useResetCodeValidation() {
  const [resetCode, setResetCode] = useState("");
  const [resetCodeError, setResetCodeError] = useState("");

  function validateResetCode() {
    const codeRegex = /^\d{6}$/; // 6-digit number
    if (!resetCode) {
      setResetCodeError("Reset code is required.");
      return false;
    }
    if (!codeRegex.test(resetCode)) {
      setResetCodeError("The reset code must be a 6-digit number.");
      return false;
    }
    setResetCodeError("");
    return true;
  }

  return {
    resetCode,
    setResetCode,
    resetCodeError,
    validateResetCode,
  };
}

export default useResetCodeValidation;

import { useState } from "react";

function useEmailValidation() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);

  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
      setEmailIsValid(true);
      setEmailError("");
    } else {
      setEmailIsValid(false);
      setEmailError("Please enter a valid email.");
    }
  }

  return { email, emailIsValid, emailError, handleEmailChange };
}

export default useEmailValidation;

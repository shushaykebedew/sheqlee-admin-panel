import { useState } from "react";
import classes from "./login.module.css";
import Hero from "../components/hero/Hero";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/input-field/InputField";
import PasswordField from "../components/password-field/PasswordField";
import Button from "../components/button/Button";
import useEmailValidation from "../hooks/useEmailValidation";
import usePasswordValidation from "../hooks/usePasswordValidation";
import { dummyUsers } from "../pages/users/data";
import { useAuth } from "../authentication/AuthContext";

function Login() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { passwordError } = usePasswordValidation(password);
  const { email, emailError, handleEmailChange } = useEmailValidation();
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  function handlePasswordChange(e) {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setLoginError("");
  }

  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);
  }

  const isFormValid = email && password && !emailError && !passwordError;

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);

    if (isFormValid) {
      // Check if the user exists and if the password matches
      const user = dummyUsers.find((user) => user.email === email);

      if (user && user.password === password) {
        // Update isAuthenticated state in App component
        loginUser();
        // Redirect to home if credentials are valid
        navigate("/");
      } else {
        setLoginError("Invalid email or password.");
      }
    }
  }

  return (
    <div className={classes["login-container"]}>
      <Hero />
      <div className={classes["form-container"]}>
        <form className={classes["login-form"]} onSubmit={handleSubmit}>
          <InputField
            label="Log in"
            type="email"
            placeholder="Email..."
            value={email}
            onChange={handleEmailChange}
            error={isSubmitted && emailError}
          />

          <PasswordField
            placeholder="Password..."
            value={password}
            onChange={handlePasswordChange}
            error={isSubmitted && passwordError}
            showEyeIcon
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
          {loginError && (
            <p className={classes["error-message"]}>{loginError}</p>
          )}
          <div className={classes["action-buttons"]}>
            <Button
              type="submit"
              className={`${classes.button} ${
                isFormValid ? classes.valid : ""
              }`}
              disabled={!isFormValid}
            >
              Log in
            </Button>
            <span className={classes["reset-link"]}>
              Forgot password? <Link to="/forgot-password">Reset</Link>
            </span>
          </div>
        </form>
        <p className={classes["first-time-text"]}>
          First time logging in? Click{" "}
          <Link to="/account-activation">here</Link> to activate your account.
        </p>
      </div>
    </div>
  );
}

export default Login;

import { useState } from "react";
import classes from "./login.module.css";
import Hero from "../components/hero/Hero";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/input-field/InputField";
import PasswordField from "../components/password-field/PasswordField";
import Button from "../components/button/Button";
import useEmailValidation from "../hooks/useEmailValidation";
import usePasswordValidation from "../hooks/usePasswordValidation";

const userData = {
  storedEmail: "sh@gm.co",
  storedPassword: "Abc123",
};

function Login() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { passwordError } = usePasswordValidation(password);
  const { email, emailError, handleEmailChange } = useEmailValidation();
  const navigate = useNavigate();

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
      if (
        password === userData.storedPassword &&
        email === userData.storedEmail
      ) {
        navigate("/home");
      } else {
        setLoginError("User not found!");
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

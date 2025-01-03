import { useNavigate } from "react-router-dom";
import Hero from "../../components/hero/Hero";
import Button from "../../components/button/Button";
import InputField from "../../components/input-field/InputField";
import useEmailValidation from "../../hooks/useEmailValidation";
import classes from "./forgotpassword.module.css";
import { useState } from "react";

function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { email, emailIsValid, emailError, handleEmailChange } =
    useEmailValidation();

  function handleReset(e) {
    setIsSubmitted(true);
    e.preventDefault();
    if (emailIsValid) {
      navigate("/new-password", { state: { email } });
    } else {
      console.log("Email is invalid:", emailError);
    }
  }

  return (
    <div className={classes["forgot-password-container"]}>
      <Hero />
      <div className={classes["form-container"]}>
        <form
          className={classes["forgot-password-form"]}
          onSubmit={handleReset}
        >
          <label>Forgot Password?</label>
          <p className={classes["forgot-message"]}>
            Please enter your email to get a password reset code.
          </p>
          <InputField
            type="email"
            placeholder="Your email..."
            value={email}
            onChange={handleEmailChange}
            error={isSubmitted && emailError}
          />

          <div className={classes["action-buttons"]}>
            <Button
              type="submit"
              className={`${classes.button} ${
                emailIsValid ? classes.valid : ""
              }`}
              disabled={!emailIsValid}
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;

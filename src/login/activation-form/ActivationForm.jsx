import { useState, useEffect } from "react";
import classes from "./activationform.module.css";
import Hero from "../../components/hero/Hero";
import Button from "../../components/button/Button";
import InputField from "../../components/input-field/InputField";
import PasswordField from "../../components/password-field/PasswordField";
import useResetCodeValidation from "../../hooks/useResetCodeValidation";
import usePasswordValidation from "../../hooks/usePasswordValidation";

function ActivationForm() {
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetCode, setResetCode, resetCodeError, validateResetCode } =
    useResetCodeValidation();

  const { passwordError } = usePasswordValidation(passwordOne, passwordTwo);

  useEffect(() => {
    if (resetCode) {
      validateResetCode();
    }
  }, [resetCode]);

  function handleSubmit(e) {
    setIsSubmitted(true);
    e.preventDefault();
    if (!passwordError && !resetCodeError) {
      console.log("Password successfully reset!");
    }
  }

  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);
  }

  const isFormValid =
    passwordOne &&
    (passwordTwo ? passwordTwo : true) &&
    resetCode &&
    !passwordError &&
    !resetCodeError;

  return (
    <div className={classes["activation-container"]}>
      <Hero />
      <div className={classes["activation-form-container"]}>
        <form className={classes["activation-form"]} onSubmit={handleSubmit}>
          <div className={classes["left"]}>
            <label>Enter Code</label>
            <p className={classes["activation-message"]}>
              Please enter the one-time code sent to your email and set a new
              password.
            </p>

            <InputField
              type="text"
              placeholder="Enter Code"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              error={isSubmitted && resetCodeError}
            />
          </div>
          <div className={classes["right"]}>
            <label>New Password</label>
            <PasswordField
              placeholder="Password..."
              value={passwordOne}
              onChange={(e) => setPasswordOne(e.target.value)}
              showEyeIcon={true}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            />

            <PasswordField
              placeholder="Confirm Password..."
              value={passwordTwo}
              error={isSubmitted && passwordError}
              onChange={(e) => setPasswordTwo(e.target.value)}
              showEyeIcon={false}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            />

            <div className={classes["action-buttons"]}>
              <Button
                type="submit"
                className={`${classes.button}${
                  isFormValid ? classes.valid : ""
                }`}
                disabled={!isFormValid}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ActivationForm;

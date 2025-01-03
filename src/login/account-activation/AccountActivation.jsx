import { useNavigate } from "react-router-dom";

import classes from "./accountactivation.module.css";
import Hero from "../../components/hero/Hero";
import Button from "../../components/button/Button";
import InputField from "../../components/input-field/InputField";
import useEmailValidation from "../../hooks/useEmailValidation";
import { useState } from "react";

function AccountActivation() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { email, emailIsValid, emailError, handleEmailChange } =
    useEmailValidation();

  function handleReset(e) {
    setIsSubmitted(true);
    e.preventDefault();
    if (emailIsValid) {
      navigate("/activation-form", { state: { email } });
    }
  }

  return (
    <div className={classes["account-activation-container"]}>
      <Hero />
      <div className={classes["form-container"]}>
        <form
          className={classes["account-activation-form"]}
          onSubmit={handleReset}
        >
          <label>Account Activation?</label>
          <p className={classes["activation-message"]}>
            Please enter your email to get account activation code.
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
              Activate
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountActivation;

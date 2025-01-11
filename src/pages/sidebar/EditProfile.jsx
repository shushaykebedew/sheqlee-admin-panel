import { useNavigate } from "react-router-dom";
import { BackwardArrowIcon, PencilIcon } from "../../SvgIcons";
import classes from "./editprofile.module.css";
import { useState } from "react";
import defaultProfile from "../../images/profile-lg.png";
import Button from "../../components/button/Button";

function EditProfile() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profile, setProfile] = useState(defaultProfile);

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfile(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct updated user data
    const updatedUser = {
      fullName,
      email,
      phone,
      password,
      profile,
    };

    console.log("Updated user:", updatedUser);

    // Navigate back to the previous page
    navigate("..");
  };

  const isFormValid =
    fullName.trim() !== "" &&
    email.trim() !== "" &&
    phone.trim() !== "" &&
    password === confirmPassword &&
    profile !== defaultProfile;

  return (
    <div className={classes.profile}>
      {/* Header */}
      <div className={classes.headers}>
        <div className={classes.backward} onClick={() => navigate(-1)}>
          <BackwardArrowIcon />
        </div>
        <div className={classes["main-header"]}>
          {" "}
          <h1 className={classes["main-header-text"]}>Edit Profile</h1>
          <div className={classes["main-header-line"]}></div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className={`${classes.label} ${isFormValid ? classes.valid : ""}`}>
          <p className={classes["user-id"]}>USR005</p>
          <p>~ User ID</p>
        </div>
        <div className={classes.inputs}>
          {/* Text Inputs */}
          <div className={classes["text-inputs"]}>
            <div className={classes.input}>
              <input
                type="text"
                placeholder="FullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <span className={classes.pencil}>
                <PencilIcon />
              </span>
            </div>
            <div className={classes.input}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className={classes.pencil}>
                <PencilIcon />
              </span>
            </div>
            <div className={classes.input}>
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />{" "}
              <span className={classes.pencil}>
                <PencilIcon />
              </span>
            </div>
            <div className={classes.input}>
              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={classes.input}>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <p>Leave this empty if you don't want change your password.</p>
          </div>

          {/* Profile Picture */}
          <div className={classes["image-inputs"]}>
            <div className={classes["user-profile-container"]}>
              <img
                src={profile}
                alt="user-profile"
                className={classes["user-profile"]}
              />
            </div>
            <label className={classes["upload-button"]}>
              {profile === defaultProfile ? "Upload photo" : "Change photo"}
              <input
                type="file"
                accept="image/*"
                className={classes["file-input"]}
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className={classes["save-btn"]}>
          <Button
            type="submit"
            className={`${classes.button} ${isFormValid ? classes.valid : ""}`}
            disabled={!isFormValid}
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;

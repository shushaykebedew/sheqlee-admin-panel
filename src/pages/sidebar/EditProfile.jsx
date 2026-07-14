import { useNavigate } from "react-router-dom";
import { BackwardArrowIcon, PencilIcon } from "../../SvgIcons";
import classes from "./editprofile.module.css";
import { useState, useEffect } from "react";
import defaultProfile from "../../images/profile-lg.png";
import Button from "../../components/button/Button";
import { useAuth } from "../../authentication/AuthContext";

function EditProfile() {
  const { currentUser, updateUser } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profile, setProfile] = useState(defaultProfile);

  const navigate = useNavigate();

  // Prefill form fields with current user data
  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.fullName || "Miruts Yfter");
      setEmail(currentUser.email || "miruts@gmail.com");
      setPhone(currentUser.phone || "+251912345678");
      setProfile(currentUser.profile || defaultProfile);
    }
  }, [currentUser]);

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

    if (password && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Construct updated user data
    const updatedUser = {
      ...currentUser,
      fullName,
      email,
      phone,
      profile,
      ...(password && { password }), // Include password only if provided
    };

    // Update user data
    updateUser(updatedUser);

    // Navigate back to the previous page
    // navigate("..");
  };

  const isFormValid =
    fullName.trim() !== "" &&
    email.trim() !== "" &&
    phone.trim() !== "" &&
    (!password || password === confirmPassword) &&
    profile !== defaultProfile;

  return (
    <div className={classes.profile}>
      {/* Header */}
      <div className={classes.headers}>
        <div className={classes.backward} onClick={() => navigate(-1)}>
          <BackwardArrowIcon />
        </div>
        <div className={classes["main-header"]}>
          <h1 className={classes["main-header-text"]}>Edit Profile</h1>
          <div className={classes["main-header-line"]}></div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className={`${classes.label} ${isFormValid ? classes.valid : ""}`}>
          <p className={classes["user-id"]}>{currentUser?.id || "USR001"}</p>
          <p>~ User ID</p>
        </div>
        <div className={classes.inputs}>
          {/* Text Inputs */}
          <div className={classes["text-inputs"]}>
            <div className={classes.input}>
              <input
                type="text"
                placeholder="Full name"
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
              />
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
            <p>Leave this empty if you don't want to change your password.</p>
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

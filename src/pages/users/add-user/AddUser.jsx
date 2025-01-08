import { useContext, useState } from "react";
import classes from "./adduser.module.css";
import Headers from "./Headers";
import SelectRole from "./SelectRole";
import Button from "../../../components/button/Button";
import defaultProfile from "../../../images/settings - alt2.png";
import { UsersContext } from "../Users";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const { onAddUser } = useContext(UsersContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userRole, setUserRole] = useState(0);
  const [profile, setProfile] = useState(defaultProfile);
  const [userStatus, setUserStatus] = useState("Active");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      userId: Date.now(),
      fullName: fullName,
      email: email,
      phone: phone,
      role: userRole,
      status: userStatus,
      createdOn: new Date().toLocaleDateString(),
    };

    onAddUser(newUser);
    navigate("..");
    // Reset the form
    setFullName("");
    setEmail("");
    setPhone("");
    setUserRole("");
    setUserStatus("Active");
    setProfile(defaultProfile);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfile(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUserRoleChange = (newUserRole) => {
    setUserRole(newUserRole);
  };

  const isFormValid =
    fullName !== "" &&
    email !== "" &&
    phone !== "" &&
    userRole !== "" &&
    profile !== defaultProfile;

  return (
    <div className={classes["add-user"]}>
      <Headers />
      <form onSubmit={handleSubmit}>
        <div className={`${classes.label} ${isFormValid ? classes.valid : ""}`}>
          <p className={classes["user-id"]}>CTID009</p>
          <p>~ User ID</p>
        </div>
        <div className={classes.inputs}>
          <div className={classes["text-inputs"]}>
            <div className={classes.input}>
              <input
                type="text"
                placeholder="Fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className={classes.input}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={classes.input}>
              <input
                type="phone"
                placeholder="Phone number "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className={classes["dropdown"]}>
              <SelectRole onChange={handleUserRoleChange} />
            </div>
          </div>
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
                accept="images/*"
                className={classes["file-input"]}
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
        <div className={classes["save-btn"]}>
          <Button
            type="submit"
            className={`${classes.button} ${isFormValid ? classes.valid : ""}`}
            disabled={!isFormValid}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;

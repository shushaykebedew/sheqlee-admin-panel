import { useContext, useEffect, useState } from "react";
import classes from "./updateuser.module.css";
import Headers from "./Headers";
import SelectRole from "./SelectRole";
import Button from "../../../components/button/Button";
import defaultProfile from "../../../images/me.jpg";
import { UsersContext } from "../Users";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
  const { onUpdateUser, dummyUsers } = useContext(UsersContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userRole, setUserRole] = useState("");
  const [profile, setProfile] = useState(defaultProfile);
  const [userStatus, setUserStatus] = useState("Active");

  const navigate = useNavigate();
  const { userId } = useParams();

  const user = dummyUsers.find((user) => user.userId === userId);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setUserRole(user.role || "");
      setProfile(user.profile || defaultProfile);
      setUserStatus(user.status || "Active");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      fullName: fullName,
      email: email,
      phone: phone,
      role: userRole,
      status: userStatus,
      profile: profile,
      updatedOn: new Date().toLocaleDateString(),
    };

    onUpdateUser(updatedUser);
    navigate("..");
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
    fullName !== "" && email !== "" && profile !== defaultProfile;

  return (
    <div className={classes["update-user"]}>
      <Headers />
      <form onSubmit={handleSubmit}>
        <div className={`${classes.label} ${isFormValid ? classes.valid : ""}`}>
          <p className={classes["user-id"]}>{user.userId || "New User"}</p>
          <p>~ User ID</p>
        </div>
        <div className={classes.inputs}>
          <div className={classes["text-inputs"]}>
            <div className={classes.input}>
              <input
                type="text"
                placeholder="User fullName"
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
                placeholder="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className={classes["dropdown"]}>
              <SelectRole
                onChange={handleUserRoleChange}
                selectedRole={userRole} // Pass current role to SelectRole
              />
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
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;

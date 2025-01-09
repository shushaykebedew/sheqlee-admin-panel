import { useNavigate } from "react-router-dom";
import profile from "../../images/profile-lg.png";
import classes from "./accountdetails.module.css";

function AccountDetails() {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.stopPropagation();
    navigate("/");
  };

  return (
    <div className={classes["account-details"]}>
      <div className={classes["account-detail"]}>
        <img src={profile} alt="profile" className={classes["profile-img"]} />
        <p className={classes.username}>Muruts Yifter</p>
      </div>
      <div className={classes.action}>
        <button className={classes["logout-button"]} onClick={handleLogout}>
          <span className={classes["logout-text"]}>Logout</span>
          <span className={classes["forward-arrow"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="5.755"
              height="9.279"
              viewBox="0 0 5.755 9.279"
            >
              <path
                id="Icon_ionic-ios-arrow-forward"
                data-name="Icon ionic-ios-arrow-forward"
                d="M14.527,10.3,11.419,7.2a.585.585,0,0,1,0-.829.592.592,0,0,1,.832,0l3.522,3.519a.586.586,0,0,1,.017.81L12.253,14.24a.587.587,0,1,1-.832-.829Z"
                transform="translate(-10.746 -5.632)"
                stroke="#000"
                strokeWidth="1"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

export default AccountDetails;

import React from "react";
import ReactDOM from "react-dom";
import classes from "./deletionreasonmodal.module.css";
import { CancelIcon } from "../../../SvgIcons";

function Backdrop({ onClose }) {
  return (
    <div className={classes.backdrop}>
      <button onClick={onClose} className={classes["modal-close-icon"]}>
        <CancelIcon />
      </button>
    </div>
  );
}

function DeletionModal({ children }) {
  return <div className={classes.modal}>{children}</div>;
}

function DeletionReasonModal({ isOpen, onClose, company }) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <DeletionModal>
          <div className={classes["deletion-reason-modal"]}>
            <h2>{company?.companyName || "Unknown Company"}</h2>
            <h3>Deletion Reason</h3>
            <div className={classes["deletion-reason-content"]}>
              <p>
                We could not find the types of developers we are looking for
                here on your platform . As a result we have decided to close our
                account and when ever the need arises we will for sure be back
                on your platform looking for developers. Thankyou for all what
                you are doing!
              </p>
            </div>
            <div className={classes["modal-action"]}>
              <button onClick={onClose} className={classes["modal-apply-btn"]}>
                Okay, got it.
              </button>
            </div>
          </div>
        </DeletionModal>,
        document.getElementById("modal-root")
      )}
    </>
  );
}

export default DeletionReasonModal;

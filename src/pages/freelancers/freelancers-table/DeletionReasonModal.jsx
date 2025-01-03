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

function DeletionReasonModal({ isOpen, onClose, freelancer }) {
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
            <h2>{freelancer?.name}</h2>
            <h3>Deletion Reason</h3>
            <div className={classes["deletion-reason-content"]}>
              <p>
                Thank you Sheqlee. I found a Korean company that wanted to hire
                me full time. so I have no need for my account at Sheqlee and I
                have decided to delete my account. When i need it i will come
                back and create an account again.
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

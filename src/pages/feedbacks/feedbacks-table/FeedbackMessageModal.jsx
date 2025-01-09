import React, { useState } from "react";
import ReactDOM from "react-dom";
import classes from "./FeedbackMessageModal.module.css";
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

function FeedbackModal({ children }) {
  return <div className={classes.modal}>{children}</div>;
}

function FeedbackMessageModal({ isOpen, onClose, feedback }) {
  const [copySuccess, setCopySuccess] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleCopyFeedback = () => {
    if (feedback?.message) {
      navigator.clipboard.writeText(feedback.message).then(
        () => {
          setCopySuccess(true);
          setTimeout(() => {
            setCopySuccess(false);
            onClose(); // Close the modal after showing the message
          }, 2000); // Show the message for 2 seconds before closing
        },
        (error) => {
          console.error("Failed to copy text:", error);
        }
      );
    }
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <FeedbackModal>
          <div className={classes["feedback-message-modal"]}>
            <div className={classes.name}>
              <label>Name </label>
              {feedback.name}
            </div>
            <div className={classes.email}>
              <label>E-mail </label>
              {feedback.email}
            </div>

            <div className={classes["feedback-message-content"]}>
              <label>Message</label> <p>{feedback.message}</p>
            </div>
            <div className={classes["modal-action"]}>
              <button
                onClick={handleCopyFeedback}
                className={classes["modal-apply-btn"]}
              >
                Copy feedback
              </button>
            </div>
            {copySuccess && (
              <p className={classes["copy-success"]}>Message copied!</p>
            )}
          </div>
        </FeedbackModal>,
        document.getElementById("modal-root")
      )}
    </>
  );
}

export default FeedbackMessageModal;

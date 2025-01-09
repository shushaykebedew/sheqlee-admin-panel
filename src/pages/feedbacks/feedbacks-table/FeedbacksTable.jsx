import React, { useContext, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import classes from "./feedbackstable.module.css";
import { DeleteIcon, EditIcon } from "../../../SvgIcons";
import { FeedbacksContext } from "../Feedbacks";
import FeedbackMessageModal from "./FeedbackMessageModal";

function FeedbacksTable() {
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const { dummyFeedbacks, onDelete } = useContext(FeedbacksContext);

  const totalFeedbacks = dummyFeedbacks.length;
  const totalPages = Math.ceil(totalFeedbacks / rowsPerPage);

  const currentFeedbacks = dummyFeedbacks.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleModalOpen = (feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedFeedback(null);
    setIsModalOpen(false);
  };

  return (
    <div className={classes.feedbacks}>
      <table className={classes["feedbacks-table"]}>
        <thead>
          <tr>
            <th>Fe. ID</th>
            <th>Message</th>
            <th>Name</th>
            <th>E-mail</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentFeedbacks.map((feedback) => (
            <tr key={feedback.feId}>
              <td>{feedback.feId}</td>
              <td>{feedback.message}</td>
              <td>{feedback.name}</td>
              <td className={classes["email-link"]}>
                <a href={`mailto:${feedback.email}`} className={classes.email}>
                  {feedback.email}
                </a>
              </td>

              <td>
                <div className={classes.action}>
                  <button onClick={() => handleModalOpen(feedback)}>
                    <EditIcon />
                  </button>
                  <button onClick={() => onDelete(feedback.feId)}>
                    <DeleteIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className={classes.pagination}>
          <div className={classes.text}>
            Rows per page:
            <div className={classes["rows-per-page"]}>
              <input
                type="number"
                min={1}
                max={10}
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(e.target.value)}
              />
            </div>
          </div>
          <div>{`${(currentPage - 1) * rowsPerPage + 1}-${Math.min(
            currentPage * rowsPerPage,
            totalFeedbacks
          )} of ${totalFeedbacks}`}</div>
          <ul className={classes.pages}>
            <li
              className={`${classes.backward} ${
                currentPage === 1 ? classes.disabled : ""
              }`}
            >
              <button onClick={() => handlePageChange("prev")}>
                <IoChevronBack />
              </button>
            </li>
            <li className={classes["page-number"]}>{currentPage}</li>
            <li
              className={`${classes.backward} ${
                currentPage === totalPages ? classes.disabled : ""
              }`}
            >
              <button onClick={() => handlePageChange("next")}>
                <IoChevronForward />
              </button>
            </li>
          </ul>
        </div>
      )}
      {isModalOpen && (
        <FeedbackMessageModal
          isOpen={isModalOpen}
          feedback={selectedFeedback}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

export default FeedbacksTable;

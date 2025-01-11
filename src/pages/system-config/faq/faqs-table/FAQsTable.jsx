import React, { useContext, useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import classes from "./faqstable.module.css";
import statusRed from "../../../../images/switch-red.png";
import statusGreen from "../../../../images/switch-green.png";
import statusGray from "../../../../images/switch-black.png";
import { EditIcon, DeleteIcon } from "../../../../SvgIcons";
import { FAQsContext } from "../FAQ";
import { useNavigate } from "react-router-dom";

function FAQsTable() {
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    dummyFAQs,
    onDelete,
    onSortChange,
    sortBy,
    sortOrder,
    onToggleStatus,
  } = useContext(FAQsContext);

  const navigate = useNavigate();
  const handleNavigateUpdate = (faq) => {
    navigate(`update-faq/${faq.faqId}`);
    console.log(faq.faqId);
  };

  const totalFAQs = dummyFAQs.length;
  const totalPages = Math.ceil(totalFAQs / rowsPerPage);

  const currentFAQs = dummyFAQs.slice(
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

  const getStatusIcon = {
    Active: <img src={statusGreen} alt="active" />,
    Inactive: <img src={statusRed} alt="inactive" />,
    Deleted: <img src={statusGray} alt="deleted" />,
  };

  const getSortIndicator = (column) => {
    if (sortBy === column) {
      return sortOrder === "asc" ? "▼" : "▲";
    }
    return "▼";
  };

  // Initialize the sorting state if not set
  useEffect(() => {
    if (!sortBy) {
      onSortChange("faqId", "desc");
    }
  }, [sortBy, onSortChange]);

  return (
    <div className={classes.faqs}>
      <table className={classes["faqs-table"]}>
        <thead>
          <tr>
            <th>
              FAQ ID
              <button
                className={classes["sort-icon"]}
                onClick={() => onSortChange("faqId")}
              >
                {getSortIndicator("faqId")}
              </button>
            </th>
            <th>
              Questions
              <button
                className={classes["sort-icon"]}
                onClick={() => onSortChange("question")}
              >
                {getSortIndicator("question")}
              </button>
            </th>
            <th>Audience</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentFAQs.map((faq) => (
            <tr key={faq.faqId}>
              <td>{faq.faqId}</td>
              <td>{faq.question}</td>
              <td>{faq.audience}</td>
              <td>
                <div className={classes.action}>
                  <button
                    className={classes["status-icon"]}
                    onClick={() => onToggleStatus(faq.faqId)}
                  >
                    {getStatusIcon[faq.status]}
                  </button>
                  <button onClick={() => handleNavigateUpdate(faq)}>
                    <EditIcon />
                  </button>
                  <button onClick={() => onDelete(faq.faqId)}>
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
            totalFAQs
          )} of ${totalFAQs}`}</div>
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
    </div>
  );
}

export default FAQsTable;

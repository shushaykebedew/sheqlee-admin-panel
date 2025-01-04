import React, { useContext, useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import classes from "./jobapplicantstable.module.css";
import { DeleteIcon, DocumentIcon } from "../../../../SvgIcons";
import { JobsContext } from "../../JobPosts";

function JobApplicantsTable({
  dummyApplicants,
  onDelete,
  onSortChange,
  sortBy,
  sortOrder,
}) {
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  const totalApplicants = dummyApplicants.length;
  const totalPages = Math.ceil(totalApplicants / rowsPerPage);

  const currentApplicants = dummyApplicants.slice(
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

  const getSortIndicator = (column) => {
    if (sortBy === column) {
      return sortOrder === "asc" ? "▼" : "▲";
    }
    return "▼";
  };

  // Initialize the sorting state if not set
  useEffect(() => {
    if (!sortBy) {
      onSortChange("id", "desc");
    }
  }, [sortBy, onSortChange]);

  return (
    <div className={classes.applicants}>
      <table className={classes["applicants-table"]}>
        <thead>
          <tr>
            <th>
              Fr. ID
              <button
                className={classes["sort-icon"]}
                onClick={() => onSortChange("frId")}
              >
                {getSortIndicator("frId")}
              </button>
            </th>
            <th>
              Freelancer name
              <button
                className={classes["sort-icon"]}
                onClick={() => onSortChange("name")}
              >
                {getSortIndicator("name")}
              </button>
            </th>
            <th>Title</th>
            <th>E-mail</th>
            <th>Applied date</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentApplicants.map((freelancer) => (
            <tr key={freelancer.frId}>
              <td>{freelancer.frId}</td>
              <td>{freelancer.name}</td>
              <td>{freelancer.title}</td>
              <td className={classes["email-link"]}>
                <a
                  href={`mailto:${freelancer.email}`}
                  className={classes.email}
                >
                  {freelancer.email}
                </a>
              </td>

              <td>{freelancer.appDate}</td>

              <td>
                <div className={classes.action}>
                  <button>
                    <DocumentIcon />
                  </button>
                  <button onClick={() => onDelete(freelancer.frId)}>
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
            totalApplicants
          )} of ${totalApplicants}`}</div>
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

export default JobApplicantsTable;

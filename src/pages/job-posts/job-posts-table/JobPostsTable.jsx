import React, { useContext, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import classes from "./jobpoststable.module.css";
import statusRed from "../../../images/switch-red.png";
import statusGreen from "../../../images/switch-green.png";
import { EditIcon, DeleteIcon, LinkIcon } from "../../../SvgIcons";
import { JobsContext } from "../JobPosts";

function JobPostsTable() {
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  const { dummyJobPosts, onDelete } = useContext(JobsContext);

  const totalPosts = dummyJobPosts.length;
  const totalPages = Math.ceil(totalPosts / rowsPerPage);

  // Get the posts to display on the current page
  const currentPosts = dummyJobPosts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className={classes.jobs}>
      <table className={classes["jobs-table"]}>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Job Title</th>
            <th>Company</th>
            <th>Applicants</th>
            <th>Post Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.company}</td>
              <td>
                <div className={classes.applicants}>
                  <span>{post.applicants}</span>
                  <span className={classes["link-icon"]}>{<LinkIcon />}</span>
                </div>
              </td>
              <td>{post.postDate}</td>
              <td>{post.status}</td>
              <td>
                <div className={classes.action}>
                  <span className={classes["status-icon"]}>
                    {post.action === "Active" ? (
                      <img src={statusGreen} alt="active" />
                    ) : (
                      <img src={statusRed} alt="inactive" />
                    )}
                  </span>
                  <button>
                    <EditIcon />
                  </button>
                  <button onClick={() => onDelete(post.id)}>
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
            totalPosts
          )} of ${totalPosts}`}</div>
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

export default JobPostsTable;

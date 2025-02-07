import React, { useContext, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import classes from "./apgsppttcp_table.module.css";
import { EditIcon, DeleteIcon } from "../../../../SvgIcons";
import { APGSPPTSCP_Context } from "../APGSPPTSCP";
import { useNavigate } from "react-router-dom";

function APGSPPTSCP_Table() {
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const { dummyAPGSPPTSCP, onDelete } = useContext(APGSPPTSCP_Context);

  const navigate = useNavigate();

  // Flatten and sort data by iteration (Latest to Oldest)
  const flattenedData = dummyAPGSPPTSCP
    .flatMap((page) =>
      page.iterations.map((iteration) => ({
        pageTitle: page.pageTitle,
        status: page.status,
        pageId: page.pageId,
        iterations: page.iterations, // Pass the full iterations array
        ...iteration,
      }))
    )
    .sort((a, b) => Number(b.iteration) - Number(a.iteration)); // Sort by iteration in descending order

  const totalIterations = flattenedData.length;
  const totalPages = Math.ceil(totalIterations / rowsPerPage);

  const currentData = flattenedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Ensure that at least 7 rows are displayed
  const minRows = 7;
  const placeholderRows = Array.from({
    length: Math.max(0, minRows - currentData.length),
  });

  // Determine the status icon
  const getStatusIcon = (iterations, iteration) => {
    const latestIteration = iterations.reduce((latest, current) =>
      Number(current.iteration) > Number(latest.iteration) ? current : latest
    );

    const isLatest = iteration === latestIteration.iteration;
    const dotClass = isLatest
      ? `${classes.dot} ${classes["dot-green"]}`
      : `${classes.dot} ${classes["dot-red"]}`;

    return <span className={dotClass}></span>;
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleRowsPerPageChange = (e) => {
    const value = Math.max(1, Number(e.target.value) || 1);
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className={classes.apgsppttcp}>
      <table className={classes["apgsppttcp-table"]}>
        <thead>
          <tr>
            <th>Page</th>
            <th>Iteration</th>
            <th>Updated by</th>
            <th>Updated on</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((data, index) => (
            <tr key={`${data.pageId}-${data.id}-${index}`}>
              <td>{data.pageTitle}</td>
              <td>{data.iteration}</td>
              <td>{data.updatedBy}</td>
              <td>{data.updatedOn}</td>
              <td>
                <div className={classes.action}>
                  <span className={classes["status-icon"]}>
                    {getStatusIcon(data.iterations, data.iteration)}
                  </span>
                  <button
                    onClick={() =>
                      navigate(`read-apgspptscp/${data.pageId}`, {
                        state: { iteration: data.iteration },
                      })
                    }
                  >
                    <EditIcon />
                  </button>
                  <button onClick={() => onDelete(data.pageId, data.id)}>
                    <DeleteIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {/* Render placeholder rows to fill up to the minimum of 7 rows */}
          {placeholderRows.map((_, index) => (
            <tr key={`placeholder-${index}`} className={classes.placeholderRow}>
              <td colSpan="5"></td>{" "}
              {/* Adjust the colspan based on your table structure */}
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
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
              />
            </div>
          </div>
          <div>{`${(currentPage - 1) * rowsPerPage + 1}-${Math.min(
            currentPage * rowsPerPage,
            totalIterations
          )} of ${totalIterations}`}</div>
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

export default APGSPPTSCP_Table;

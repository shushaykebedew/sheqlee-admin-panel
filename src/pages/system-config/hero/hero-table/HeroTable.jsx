import React, { useContext, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import classes from "./herotable.module.css";
import { PencilIcon, DeleteIcon } from "../../../../SvgIcons";
import { HeroContext } from "../Hero";
import { useNavigate } from "react-router-dom";

function HeroTable() {
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const { heroData, onDelete } = useContext(HeroContext);

  const navigate = useNavigate();

  const handleNavigateUpdate = (section) => {
    navigate(`update-hero/${section.sectionId}`);
  };

  const totalSections = heroData.length;
  const totalPages = Math.ceil(totalSections / rowsPerPage);

  const currentSections = heroData.slice(
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

  const handleRowsPerPageChange = (e) => {
    const value = Math.max(1, Number(e.target.value) || 1);
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className={classes.hero}>
      <table className={classes["hero-table"]}>
        <thead>
          <tr>
            <th>Section</th>
            <th>Content</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentSections.map((section) => (
            <tr key={section.sectionId}>
              <td>{section.title}</td>
              <td>{section.content}</td>
              <td>
                <div className={classes.action}>
                  <button onClick={() => handleNavigateUpdate(section)}>
                    <PencilIcon />
                  </button>
                  <button onClick={() => onDelete(section.sectionId)}>
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
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
              />
            </div>
          </div>
          <div>{`${(currentPage - 1) * rowsPerPage + 1}-${Math.min(
            currentPage * rowsPerPage,
            totalSections
          )} of ${totalSections}`}</div>
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

export default HeroTable;

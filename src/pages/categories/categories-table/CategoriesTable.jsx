import React, { useContext, useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import classes from "./categoriestable.module.css";
import statusRed from "../../../images/switch-red.png";
import statusGreen from "../../../images/switch-green.png";
import statusGray from "../../../images/switch-black.png";
import { EditIcon, DeleteIcon, LinkIcon } from "../../../SvgIcons";
import { CategoriesContext } from "../Categories";
import DeletionReasonModal from "./DeletionReasonModal";
import { useNavigate } from "react-router-dom";

function CategoriesTable() {
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {
    dummyCategories,
    onDelete,
    onSortChange,
    sortBy,
    sortOrder,
    onToggleStatus,
  } = useContext(CategoriesContext);

  const navigate = useNavigate();
  const handleNavigateUpdate = (category) => {
    navigate(`update-category/${category.catId}`);
    console.log(category.catId);
  };

  const totalCategories = dummyCategories.length;
  const totalPages = Math.ceil(totalCategories / rowsPerPage);

  const currentCategories = dummyCategories.slice(
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

  const getStatusIcon = {
    Active: <img src={statusGreen} alt="active" />,
    Inactive: <img src={statusRed} alt="inactive" />,
    Deleted: <img src={statusGray} alt="deleted" />,
  };

  const handleModalOpen = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedCategory(null);
    setIsModalOpen(false);
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
      onSortChange("catId", "desc");
    }
  }, [sortBy, onSortChange]);

  return (
    <div className={classes.categories}>
      <div className={classes["table-container"]}>
        <table className={classes["categories-table"]}>
          <thead>
            <tr>
              <th>
                Cat. ID
                <button
                  className={classes["sort-icon"]}
                  onClick={() => onSortChange("catId")}
                >
                  {getSortIndicator("catId")}
                </button>
              </th>
              <th>
                Category title
                <button
                  className={classes["sort-icon"]}
                  onClick={() => onSortChange("title")}
                >
                  {getSortIndicator("title")}
                </button>
              </th>
              <th>Tags</th>

              <th>
                Jobs
                <button
                  className={classes["sort-icon"]}
                  onClick={() => onSortChange("jobs")}
                >
                  {getSortIndicator("jobs")}
                </button>
              </th>
              <th>
                Subs
                <button
                  className={classes["sort-icon"]}
                  onClick={() => onSortChange("subs")}
                >
                  {getSortIndicator("subs")}
                </button>
              </th>
              <th>Created on</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.map((category) => (
              <tr key={category.catId}>
                <td>{category.catId}</td>
                <td>{category.title}</td>
                <td>{category.tags}</td>
                <td>
                  <div className={classes.status}>
                    <span>{category.jobs}</span>
                    {
                      <button
                        className={classes["link-icon"]}
                        onClick={() => handleModalOpen(category)}
                      >
                        <LinkIcon />
                      </button>
                    }
                  </div>
                </td>
                <td>{category.subs}</td>
                <td>{category.createdOn}</td>
                <td>
                  <div className={classes.action}>
                    <button
                      className={classes["status-icon"]}
                      onClick={() => onToggleStatus(category.catId)}
                    >
                      {getStatusIcon[category.status]}
                    </button>

                    <button onClick={() => handleNavigateUpdate(category)}>
                      <EditIcon />
                    </button>
                    <button onClick={() => onDelete(category.catId)}>
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
            totalCategories
          )} of ${totalCategories}`}</div>
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
        <DeletionReasonModal
          isOpen={isModalOpen}
          company={selectedCategory}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

export default CategoriesTable;

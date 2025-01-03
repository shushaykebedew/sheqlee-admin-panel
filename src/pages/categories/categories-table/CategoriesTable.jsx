import React, { useContext, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import classes from "./categoriestable.module.css";
import statusRed from "../../../images/switch-red.png";
import statusGreen from "../../../images/switch-green.png";
import statusGray from "../../../images/switch-black.png";
import { EditIcon, DeleteIcon, LinkIcon } from "../../../SvgIcons";
import { CategoriesContext } from "../Categories";
import DeletionReasonModal from "./DeletionReasonModal";

function CategoriesTable() {
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { dummyCategories, onDelete } = useContext(CategoriesContext);

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

  return (
    <div className={classes.categories}>
      <table className={classes["categories-table"]}>
        <thead>
          <tr>
            <th>Cat. ID</th>
            <th>Category title</th>
            <th>Tags</th>

            <th>Jobs</th>
            <th>Subs</th>
            <th>Created on</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.map((category) => (
            <tr key={category.catID}>
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
                  <span className={classes["status-icon"]}>
                    {getStatusIcon[category.status]}
                  </span>
                  <button>
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

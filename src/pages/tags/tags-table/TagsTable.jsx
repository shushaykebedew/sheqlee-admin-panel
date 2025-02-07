import React, { useContext, useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import classes from "./tagstable.module.css";
import statusRed from "../../../images/switch-red.png";
import statusGreen from "../../../images/switch-green.png";
import statusGray from "../../../images/switch-black.png";
import { EditIcon, DeleteIcon, LinkIcon } from "../../../SvgIcons";
import { TagsContext } from "../Tags";
import DeletionReasonModal from "./DeletionReasonModal";
import { useNavigate } from "react-router-dom";

function TagsTable() {
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const {
    dummyTags,
    onDelete,
    onSortChange,
    sortBy,
    sortOrder,
    onToggleStatus,
  } = useContext(TagsContext);

  const navigate = useNavigate();
  const handleNavigateUpdate = (tag) => {
    navigate(`update-tag/${tag.tagId}`);
    console.log(tag.tagId);
  };

  const totalTags = dummyTags.length;
  const totalPages = Math.ceil(totalTags / rowsPerPage);

  const currentTags = dummyTags.slice(
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

  const handleModalOpen = (tag) => {
    setSelectedTag(tag);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedTag(null);
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
      onSortChange("tagId", "desc");
    }
  }, [sortBy, onSortChange]);

  return (
    <div className={classes.tags}>
      <table className={classes["tags-table"]}>
        <thead>
          <tr>
            <th>
              Tag ID
              <button
                className={classes["sort-icon"]}
                onClick={() => onSortChange("tagId")}
              >
                {getSortIndicator("tagId")}
              </button>
            </th>
            <th>
              Tag title
              <button
                className={classes["sort-icon"]}
                onClick={() => onSortChange("title")}
              >
                {getSortIndicator("title")}
              </button>
            </th>

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
          {currentTags.map((tag) => (
            <tr key={tag.tagId}>
              <td>{tag.tagId}</td>
              <td>{tag.title}</td>

              <td>
                <div className={classes.status}>
                  <span>{tag.jobs}</span>
                  {
                    <button
                      className={classes["link-icon"]}
                      onClick={() => handleModalOpen(tag)}
                    >
                      <LinkIcon />
                    </button>
                  }
                </div>
              </td>
              <td>{tag.subs}</td>
              <td>{tag.createdOn}</td>
              <td>
                <div className={classes.action}>
                  <button
                    className={classes["status-icon"]}
                    onClick={() => onToggleStatus(tag.tagId)}
                  >
                    {getStatusIcon[tag.status]}
                  </button>
                  <button onClick={() => handleNavigateUpdate(tag)}>
                    <EditIcon />
                  </button>
                  <button onClick={() => onDelete(tag.tagId)}>
                    <DeleteIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {/* Always render 7 placeholder rows if there are fewer rows on the current page */}
          {Array.from({
            length: Math.max(0, 7 - currentTags.length),
          }).map((_, index) => (
            <tr key={`placeholder-${index}`} className={classes.placeholderRow}>
              <td colSpan="6"></td>
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
            totalTags
          )} of ${totalTags}`}</div>
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
          company={selectedTag}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

export default TagsTable;

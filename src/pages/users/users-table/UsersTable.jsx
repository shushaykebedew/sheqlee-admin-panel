import React, { useContext, useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import classes from "./userstable.module.css";
import statusRed from "../../../images/switch-red.png";
import statusGreen from "../../../images/switch-green.png";
import statusGray from "../../../images/switch-black.png";
import { EditIcon, DeleteIcon } from "../../../SvgIcons";
import { UsersContext } from "../Users";
import DeletionReasonModal from "./DeletionReasonModal";
import { useNavigate } from "react-router-dom";

function UsersTable() {
  const minRows = 7;
  const [rowsPerPage, setRowsPerPage] = useState(minRows);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const {
    dummyUsers,
    onDelete,
    onSortChange,
    sortBy,
    sortOrder,
    onToggleStatus,
  } = useContext(UsersContext);

  const navigate = useNavigate();

  const handleNavigateUpdate = (user) => {
    navigate(`update-user/${user.userId}`);
  };

  const totalUsers = dummyUsers.length;
  const totalPages = Math.ceil(totalUsers / rowsPerPage);

  // Slice users for current page
  const currentUsers = dummyUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Ensure at least 7 rows by filling placeholders
  const placeholderCount = Math.max(0, minRows - currentUsers.length);
  const placeholders = Array.from({ length: placeholderCount }, (_, i) => ({
    userId: `empty-${currentPage}-${i}`,
    isPlaceholder: true,
  }));

  const displayedUsers = [...currentUsers, ...placeholders];

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

  const handleRowsPerPageChange = (e) => {
    const value = Math.max(1, Number(e.target.value) || 1);
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const handleModalOpen = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const getSortIndicator = (column) => {
    if (sortBy === column) {
      return sortOrder === "asc" ? "▼" : "▲";
    }
    return "▼";
  };

  useEffect(() => {
    if (!sortBy) {
      onSortChange("userId", "desc");
    }
  }, [sortBy, onSortChange]);

  return (
    <div className={classes.users}>
      <table className={classes["users-table"]}>
        <thead>
          <tr>
            <th>
              User ID
              <button
                className={classes["sort-icon"]}
                onClick={() => onSortChange("userId")}
              >
                {getSortIndicator("userId")}
              </button>
            </th>
            <th>
              Full Name
              <button
                className={classes["sort-icon"]}
                onClick={() => onSortChange("fullName")}
              >
                {getSortIndicator("fullName")}
              </button>
            </th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((user) => (
            <tr
              key={user.userId}
              className={user.isPlaceholder ? classes.placeholderRow : ""}
            >
              <td>{user.isPlaceholder ? "" : user.userId}</td>
              <td>{user.isPlaceholder ? "" : user.fullName}</td>
              <td>
                {user.isPlaceholder ? (
                  ""
                ) : (
                  <a href={`mailto:${user.email}`} className={classes.email}>
                    {user.email}
                  </a>
                )}
              </td>
              <td>{user.isPlaceholder ? "" : user.phone}</td>
              <td>{user.isPlaceholder ? "" : user.role}</td>
              <td>
                {!user.isPlaceholder && (
                  <div className={classes.action}>
                    <button
                      className={classes["status-icon"]}
                      onClick={() => onToggleStatus(user.userId)}
                    >
                      {getStatusIcon[user.status]}
                    </button>
                    <button onClick={() => handleNavigateUpdate(user)}>
                      <EditIcon />
                    </button>
                    <button onClick={() => onDelete(user.userId)}>
                      <DeleteIcon />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
          totalUsers
        )} of ${totalUsers}`}</div>
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
      {isModalOpen && (
        <DeletionReasonModal
          isOpen={isModalOpen}
          company={selectedUser}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

export default UsersTable;

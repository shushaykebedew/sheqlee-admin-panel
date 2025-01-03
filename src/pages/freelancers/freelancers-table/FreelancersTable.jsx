import React, { useContext, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import classes from "./freelancerstable.module.css";
import statusRed from "../../../images/switch-red.png";
import statusGreen from "../../../images/switch-green.png";
import statusGray from "../../../images/switch-black.png";
import {
  EditIcon,
  DeleteIcon,
  LinkIcon,
  DocumentIcon,
} from "../../../SvgIcons";
import { FreelancersContext } from "../Freelancers";
import DeletionReasonModal from "./DeletionReasonModal";

function FreelancersTable() {
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);

  const { dummyFreelancers, onDelete } = useContext(FreelancersContext);

  const totalFreelancers = dummyFreelancers.length;
  const totalPages = Math.ceil(totalFreelancers / rowsPerPage);

  const currentFreelancers = dummyFreelancers.slice(
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

  const handleModalOpen = (freelancer) => {
    setSelectedFreelancer(freelancer);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedFreelancer(null);
    setIsModalOpen(false);
  };

  return (
    <div className={classes.freelancers}>
      <table className={classes["freelancers-table"]}>
        <thead>
          <tr>
            <th>Fr. ID</th>
            <th>Name</th>
            <th>Title</th>
            <th>E-mail</th>
            <th>Reg. date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentFreelancers.map((freelancer) => (
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

              <td>{freelancer.regDate}</td>

              <td>
                <div className={classes.status}>
                  <span>{freelancer.status}</span>
                  {freelancer.status === "Deleted" && (
                    <button
                      className={classes["link-icon"]}
                      onClick={() => handleModalOpen(freelancer)}
                    >
                      <LinkIcon />
                    </button>
                  )}
                </div>
              </td>
              <td>
                <div className={classes.action}>
                  <span className={classes["status-icon"]}>
                    {getStatusIcon[freelancer.status]}
                  </span>
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
            totalFreelancers
          )} of ${totalFreelancers}`}</div>
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
          freelancer={selectedFreelancer}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

export default FreelancersTable;

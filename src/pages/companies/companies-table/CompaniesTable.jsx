import React, { useContext, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import classes from "./companiestable.module.css";
import statusRed from "../../../images/switch-red.png";
import statusGreen from "../../../images/switch-green.png";
import statusGray from "../../../images/switch-black.png";
import { EditIcon, DeleteIcon, LinkIcon } from "../../../SvgIcons";
import { CompaniesContext } from "../Companies";
import DeletionReasonModal from "./DeletionReasonModal";

function CompaniesTable() {
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const { dummyCompanies, onDelete } = useContext(CompaniesContext);

  const totalCompanies = dummyCompanies.length;
  const totalPages = Math.ceil(totalCompanies / rowsPerPage);

  const currentCompanies = dummyCompanies.slice(
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

  const handleModalOpen = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedCompany(null);
    setIsModalOpen(false);
  };

  return (
    <div className={classes.companies}>
      <table className={classes["companies-table"]}>
        <thead>
          <tr>
            <th>Co. ID</th>
            <th>Company name</th>
            <th>E-mail</th>
            <th>Reg. date</th>
            <th>Subs</th>
            <th>Jobs</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentCompanies.map((company) => (
            <tr key={company.coID}>
              <td>{company.coID}</td>
              <td>{company.companyName}</td>
              <td className={classes["email-link"]}>
                <a href={`mailto:${company.email}`} className={classes.email}>
                  {company.email}
                </a>
              </td>
              <td>{company.regDate}</td>
              <td>{company.subs}</td>
              <td>{company.jobs}</td>
              <td>
                <div className={classes.status}>
                  <span>{company.status}</span>
                  {company.status === "Deleted" && (
                    <button
                      className={classes["link-icon"]}
                      onClick={() => handleModalOpen(company)}
                    >
                      <LinkIcon />
                    </button>
                  )}
                </div>
              </td>
              <td>
                <div className={classes.action}>
                  <span className={classes["status-icon"]}>
                    {getStatusIcon[company.action]}
                  </span>
                  <button>
                    <EditIcon />
                  </button>
                  <button onClick={() => onDelete(company.coID)}>
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
            totalCompanies
          )} of ${totalCompanies}`}</div>
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
          company={selectedCompany}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

export default CompaniesTable;

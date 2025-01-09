import React, { useContext, useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import classes from "./testimonialstable.module.css";
import { PencilIcon, DeleteIcon } from "../../../../SvgIcons";
import { TestimonialsContext } from "../Testimonials";
import { useNavigate } from "react-router-dom";

function TestimonialsTable() {
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const { dummyTestimonials, onDelete } = useContext(TestimonialsContext);

  const navigate = useNavigate();
  const handleNavigateUpdate = (testimonial) => {
    navigate(`update-testimonial/${testimonial.testimonialId}`);
  };

  const totalTestimonials = dummyTestimonials.length;
  const totalPages = Math.ceil(totalTestimonials / rowsPerPage);

  const currentTestimonials = dummyTestimonials.slice(
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

  return (
    <div className={classes.testimonials}>
      <table className={classes["testimonials-table"]}>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Company</th>
            <th>Testimony</th>
            <th>Company rep</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentTestimonials.map((testimonial) => (
            <tr key={testimonial.testimonialId}>
              <td>
                <img
                  src={testimonial.logo}
                  alt={`${testimonial.companyName} logo`}
                  className={classes["company-logo"]}
                />
              </td>

              <td>{testimonial.companyName}</td>
              <td>{testimonial.testimony}</td>
              <td>{testimonial.companyRep}</td>

              <td>{testimonial.position}</td>

              <td>
                <div className={classes.action}>
                  <button onClick={() => handleNavigateUpdate(testimonial)}>
                    <PencilIcon />
                  </button>
                  <button onClick={() => onDelete(testimonial.testimonialId)}>
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
            totalTestimonials
          )} of ${totalTestimonials}`}</div>
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

export default TestimonialsTable;

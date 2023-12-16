/* eslint-disable react/prop-types */
import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageClick = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handlePrevClick = () => {
    const prevPage = currentPage === 1 ? totalPages : currentPage - 1;
    onPageChange(prevPage);
  };

  const handleNextClick = () => {
    const nextPage = currentPage === totalPages ? 1 : currentPage + 1;
    onPageChange(nextPage);
  };
  return (
    <div className="pagination">
      <div
        className="pagination__btn"
        onClick={handlePrevClick}
        disabled={totalPages === 1}
      >
        <FaAngleLeft />
      </div>
      {pages.map((page) => (
        <span
          key={page}
          onClick={() => handlePageClick(page)}
          className={currentPage === page ? "active" : "pagination__numbers"}
        >
          {page}
        </span>
      ))}
      <div
        className="pagination__btn"
        onClick={handleNextClick}
        disabled={totalPages === 1}
      >
        <FaAngleRight />
      </div>
    </div>
  );
};

export default Pagination;

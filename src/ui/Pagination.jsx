import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`relative border-none cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold ${
              i === currentPage
                ? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            }`}
          >
            {i}
          </button>
        );
      } else if (
        pages[pages.length - 1] !== "..." &&
        (i < currentPage - 1 || i > currentPage + 1)
      ) {
        pages.push(
          <span
            key={`ellipsis-${i}`}
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
          >
            ...
          </span>
        );
      }
    }
    return pages;
  };

  return (
    <nav
      aria-label="Pagination"
      className="isolate inline-flex -space-x-px rounded-md shadow-sm my-4"
    >
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        className="relative border-none inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 bg-gray-50 focus:z-20 focus:outline-offset-0"
        disabled={currentPage === 1}
      >
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon aria-hidden="true" className="size-5" />
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        className="relative border-none inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 bg-gray-50 focus:z-20 focus:outline-offset-0"
        disabled={currentPage === totalPages}
      >
        <span className="sr-only">Next</span>
        <ChevronRightIcon aria-hidden="true" className="size-5" />
      </button>
    </nav>
  );
};

export default Pagination;

import React from "react";

const Pagination = ({ currentPage, setPage, totalPages }) => {
  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage(currentPage + 1);
    }
  };
  if (totalPages === 0) return null;
  return (
    <div className="flex justify-center gap-4 mt-10 mb-3 items-center ">
      <button
        onClick={handlePrev}
        className=" dark:bg-red-600 bg-blue-600/80 text-white py-1 px-4 cursor-pointer rounded-md"
      >
        Prev
      </button>
      <button>{currentPage}</button>
      <button
        onClick={handleNext}
        className=" dark:bg-red-600 bg-blue-600/80 text-white py-1 px-4 cursor-pointer rounded-md"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

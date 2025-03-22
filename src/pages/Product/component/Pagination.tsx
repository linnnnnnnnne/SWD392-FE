export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const disablePrev = currentPage === 1;
  const disableNext = currentPage === totalPages;

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={disablePrev}
        className={`flex h-10 w-10 items-center justify-center rounded-full ${
          disablePrev ? 'bg-gray-300 text-gray-500' : 'bg-orange-500 text-white'
        } transition-all duration-300 hover:bg-orange-600`}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
            currentPage === index + 1
              ? 'bg-orange-500 text-white'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
          } transition-all duration-300`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disableNext}
        className={`flex h-10 w-10 items-center justify-center rounded-full ${
          disableNext ? 'bg-gray-300 text-gray-500' : 'bg-orange-500 text-white'
        } transition-all duration-300 hover:bg-orange-600`}
      >
        Next
      </button>
    </div>
  );
};

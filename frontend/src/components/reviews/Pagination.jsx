import { FaGreaterThan, FaLessThan } from "react-icons/fa6";

export const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2 text-gray-600">
            <button
              onClick={handlePrevPage}
              className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-300 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              <FaLessThan />
            </button>
            {Array.from({ length: 5 }, (_, i) => {
              const page = currentPage - 2 + i;
              if (page > 0 && page <= totalPages) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-1 rounded-full transition-all duration-300 ${
                      page === currentPage
                        ? "bg-purple-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                );
              }
              return null;
            })}
            <button
              onClick={handleNextPage}
              className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-300 disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              <FaGreaterThan />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

import { useRouter } from "next/navigation";

const Pagination = ({ totalPages, category, currentPage, setCurrentPage }) => {
  const router = useRouter();

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      if (currentPage - 1 === 1) {
        router.push(`/${category}`);
      } else {
        router.push(`/${category}?page=${currentPage - 1}`);
      }
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      router.push(`/${category}?page=${currentPage + 1}`);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (pageNumber === 1) {
      router.push(`/${category}`);
    } else {
      router.push(`/${category}?page=${pageNumber}`);
    }
  };

  return (
    <>
      {totalPages > 1 && (
        <div className="flex gap-2 justify-center mt-4 flex-wrap">
          <button
            onClick={handlePrev}
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <div className="flex gap-2 overflow-x-auto">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={
                  index + 1 === currentPage
                    ? "border border-white bg-white text-black rounded w-10 h-10 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                    : "border border-white text-white rounded w-10 h-10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                }
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;

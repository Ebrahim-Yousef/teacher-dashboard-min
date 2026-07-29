import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useStudents } from "../../hooks/useStudents";

const Pagination = () => {
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    studentsPerPage,
    setStudentsPerPage,
    totalStudents,
  } = useStudents();

  const [isOpen, setIsOpen] = useState(false);

  if (!totalStudents || totalStudents === 0) return null;

  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-4">
      {totalPages > 1 ? (
        <div
          dir="rtl"
          className="flex items-center justify-center gap-1.5 flex-wrap"
        >
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              text-slate-600
              bg-white
              transition-all
              hover:bg-primary-light
              hover:border-primary/30
              hover:text-primary
              disabled:cursor-not-allowed
              disabled:opacity-40
              disabled:hover:bg-white
              disabled:hover:border-slate-200
              disabled:hover:text-slate-600
              cursor-pointer
            "
            title="الصفحة السابقة"
          >
            <ChevronRight size={18} />
          </button>
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`
                  h-9
                  min-w-9
                  rounded-xl
                  border
                  px-3
                  text-sm
                  font-semibold
                  transition-all
                  cursor-pointer
                  ${
                    currentPage === page
                      ? "bg-primary text-white border-primary shadow-xs"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                  }
                `}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              text-slate-600
              bg-white
              transition-all
              hover:bg-primary-light
              hover:border-primary/30
              hover:text-primary
              disabled:cursor-not-allowed
              disabled:opacity-40
              disabled:hover:bg-white
              disabled:hover:border-slate-200
              disabled:hover:text-slate-600
              cursor-pointer
            "
            title="الصفحة التالية"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
      ) : (
        <div />
      )}
      <div className="relative inline-block text-right">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-primary transition-all hover:bg-slate-100 hover:border-slate-300 focus:outline-none"
        >
          <span>{studentsPerPage}</span>
          <ChevronDown
            size={14}
            className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        {isOpen && (
          <div className="absolute right-0 bottom-full mb-1 w-16 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg ring-1 ring-black/5 z-50 py-1 origin-bottom animate-slide-up-in">
            {[5, 10, 20, 50].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => {
                  setStudentsPerPage(num);
                  setIsOpen(false);
                }}
                className={`w-full text-center px-2 py-1.5 text-xs font-bold transition-colors ${
                  studentsPerPage === num
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;

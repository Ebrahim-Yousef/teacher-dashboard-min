import { Users } from "lucide-react";
import { useStudents } from "../../hooks/useStudents";

const StudentsCount = () => {
  const { totalStudents, searchTerm, selectedStage, selectedGrade } =
    useStudents();

  const isFiltered = searchTerm || selectedStage || selectedGrade;

  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-600 shadow-2xs">
      <Users className="text-primary" size={18} />
      <span className="font-medium">
        {isFiltered ? "عدد النتائج المطابقة:" : "إجمالي الطلاب المسجلين:"}
      </span>
      <span className="inline-flex items-center justify-center rounded-lg bg-primary px-2.5 py-0.5 text-xs font-bold text-white shadow-xs">
        {totalStudents}
      </span>
      <span className="font-medium">طالب</span>
    </div>
  );
};

export default StudentsCount;

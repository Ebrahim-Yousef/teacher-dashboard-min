import { Search, RotateCcw, UserPlus } from "lucide-react";
import { useStudents } from "../../hooks/useStudents";
import grades from "../../constants/grades";
import stages from "../../constants/stages";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

const StudentsHeader = ({ onAddStudent }) => {
  const {
    searchTerm,
    setSearchTerm,
    selectedStage,
    setSelectedStage,
    selectedGrade,
    setSelectedGrade,
    clearFilters,
  } = useStudents();

  const availableGrades = selectedStage ? grades[selectedStage] : [];
  const hasActiveFilters = Boolean(
    searchTerm || selectedStage || selectedGrade,
  );

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-3 sm:gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 flex-1">
        <div className="flex-1 min-w-50">
          <Input
            type="text"
            placeholder="ابحث باسم الطالب..."
            icon={Search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm("")}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            name="stage"
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            options={stages}
            placeholder="المرحلة الدراسية"
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            name="grade"
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            options={availableGrades}
            disabled={!selectedStage}
            placeholder="الصف الدراسي"
          />
        </div>
        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            onClick={clearFilters}
            className="h-10 px-3 text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center shrink-0 self-end"
            title="إعادة ضبط الفلاتر"
          >
            <RotateCcw size={18} />
            <span className="sm:hidden lg:inline text-xs font-medium mr-1.5">
              إعادة ضبط
            </span>
          </Button>
        )}
      </div>
      <div className="shrink-0 pt-3 lg:pt-0 border-t border-slate-100 lg:border-t-0">
        <Button
          onClick={onAddStudent}
          variant="primary"
          size="md"
          className="w-full sm:w-auto h-10 gap-2"
        >
          <UserPlus size={18} />
          <span>إضافة طالب جديد</span>
        </Button>
      </div>
    </div>
  );
};

export default StudentsHeader;

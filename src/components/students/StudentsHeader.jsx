import { useState, useEffect } from "react";
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
    setCurrentPage,
    clearFilters,
  } = useStudents();

  // حالة محليّة لإتاحة الكتابة السريعة
  const [searchInput, setSearchInput] = useState(searchTerm || "");

  // تطبيق Debounce لإرسال قيمة البحث للـ Context فقط بعد توقف المستخدم عن الكتابة
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== searchTerm) {
        setSearchTerm(searchInput);
        setCurrentPage(1);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput, searchTerm, setSearchTerm, setCurrentPage]);

  const handleStageChange = (e) => {
    const val = e.target.value;
    setSelectedStage(val);
    setSelectedGrade("");
    setCurrentPage(1);
  };

  const handleGradeChange = (e) => {
    setSelectedGrade(e.target.value);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchInput("");
    clearFilters();
  };

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
            placeholder="ابحث باسم الطالب أو رقم الهاتف..."
            icon={Search}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onClear={() => {
              setSearchInput("");
              setSearchTerm("");
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            name="stage"
            value={selectedStage}
            onChange={handleStageChange}
            options={stages}
            placeholder="المرحلة الدراسية"
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            name="grade"
            value={selectedGrade}
            onChange={handleGradeChange}
            options={availableGrades}
            disabled={!selectedStage}
            placeholder="الصف الدراسي"
          />
        </div>
        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleReset}
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

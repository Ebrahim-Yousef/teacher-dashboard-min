import { useState } from "react";
import StudentsHeader from "../components/students/StudentsHeader";
import StudentsTable from "../components/students/StudentsTable";
import StudentModal from "../components/students/StudentModal";
import StudentsCount from "../components/students/StudentsCount";
import Pagination from "../components/ui/Pagination";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setIsModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            إدارة الطلاب
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            عرض وتحديث ومتابعة كافة الطلاب والصفوف الدراسية
          </p>
        </div>
        <StudentsCount />
      </div>
      <StudentsHeader onAddStudent={handleAddStudent} />
      <StudentsTable onEditStudent={handleEditStudent} />
      <Pagination />
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        student={selectedStudent}
      />
    </div>
  );
};

export default Dashboard;

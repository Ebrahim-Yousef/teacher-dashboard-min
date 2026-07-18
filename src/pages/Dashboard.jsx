import { useState } from "react";

import StudentsHeader from "../components/students/StudentsHeader";
import StudentsTable from "../components/students/StudentsTable";
import StudentModal from "../components/students/StudentModal";
// import Button from "../components/ui/Button";

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
      <h1 className="text-2xl font-bold text-slate-800">الطلاب</h1>

      <StudentsHeader onAddStudent={handleAddStudent} />

      <StudentsTable onEditStudent={handleEditStudent} />

      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        student={selectedStudent}
      />
    </div>
  );
};

export default Dashboard;

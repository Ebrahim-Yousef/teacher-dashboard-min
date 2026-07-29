import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useStudents } from "../hooks/useStudents";
import StudentInfoCard from "../components/students/StudentInfoCard";
import StudentModal from "../components/students/StudentModal";
import BackButton from "../components/ui/BackButton";
import Header from "../components/layout/Header";

const StudentDetails = () => {
  const { id } = useParams();
  const { students } = useStudents();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const student = students.find((student) => student.id === Number(id));
  if (!student) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div className="space-y-6">
      <Header />
      <div className="mx-auto max-w-4xl space-y-6">
        <BackButton to="/dashboard" />
        <StudentInfoCard student={student} onEdit={() => setIsEditOpen(true)} />
        <StudentModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          student={student}
        />
      </div>
    </div>
  );
};
export default StudentDetails;

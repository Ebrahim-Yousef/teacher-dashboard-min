import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useStudents } from "../hooks/useStudents";
import StudentInfoCard from "../components/students/StudentInfoCard";
import StudentModal from "../components/students/StudentModal";
import BackButton from "../components/ui/BackButton";
import Header from "../components/layout/Header";
import { Loader2 } from "lucide-react";

const StudentDetails = () => {
  const { id } = useParams();
  const { students, loading } = useStudents();
  const [isEditOpen, setIsEditOpen] = useState(false);

  // مقارنة مرنة تتوافق مع الأرقام والنصوص (String / Number IDs)
  const student = students.find((student) => String(student.id) === String(id));

  // 1. عرض مؤشر التحميل طالما الـ API يجلب البيانات
  if (loading) {
    return (
      <div className="space-y-6">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-slate-500">
          <Loader2 className="animate-spin text-primary" size={32} />
          <p className="text-sm font-medium">جاري تحميل بيانات الطالب...</p>
        </div>
      </div>
    );
  }

  // 2. التوجيه لوحة التحكم فقط عند اكتمال التحميل وعدم وجود الطالب
  if (!student) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="space-y-6" dir="rtl">
      <Header />
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="mr-1">
          <BackButton to="/dashboard" />
        </div>

        {/* كارت كارت بيانات الطالب */}
        <StudentInfoCard student={student} onEdit={() => setIsEditOpen(true)} />

        {/* مودال تعديل بيانات الطالب */}
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

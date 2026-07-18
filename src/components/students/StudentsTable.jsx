// import students from "../../data/students";
import { useState } from "react";
import ActionMenu from "../ui/ActionMenu";
import { useStudents } from "../../hooks/useStudents";
import ConfirmDialog from "../ui/ConfirmDialog";

const StudentsTable = ({ onEditStudent }) => {
  const [studentToDelete, setStudentToDelete] = useState(null);

  const { students, filteredStudents, deleteStudent } = useStudents();

  return (
    <>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-[900px] w-full text-right">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-3 font-semibold">اسم الطالب</th>
              <th className="px-6 py-3 font-semibold">هاتف الطالب</th>
              <th className="px-6 py-3 font-semibold">هاتف ولي الأمر</th>
              <th className="px-6 py-3 font-semibold">المرحلة الدراسية</th>
              <th className="px-6 py-3 font-semibold">الصف الدراسي</th>
              <th className="px-6 py-3 font-semibold">الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id} className="border-t hover:bg-slate-50">
                  <td className="px-6 py-3">{student.name}</td>
                  <td className="px-6 py-3">{student.studentPhone}</td>
                  <td className="px-6 py-3">{student.parentPhone}</td>
                  <td className="px-6 py-3">{student.stage}</td>
                  <td className="px-6 py-3">{student.grade}</td>
                  <td className="px-6 py-3">
                    <ActionMenu
                      onEdit={() => onEditStudent(student)}
                      onDelete={() => setStudentToDelete(student)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-10 text-center text-slate-500"
                >
                  {students.length === 0
                    ? "لا يوجد طلاب حتى الآن"
                    : "لا يوجد طالب بهذا الاسم"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ConfirmDialog
        isOpen={!!studentToDelete}
        onClose={() => setStudentToDelete(null)}
        onConfirm={() => {
          deleteStudent(studentToDelete.id);
          setStudentToDelete(null);
        }}
        title="حذف الطالب"
        message={`هل أنت متأكد من حذف الطالب ${studentToDelete?.name}؟`}
      />
    </>
  );
};

export default StudentsTable;

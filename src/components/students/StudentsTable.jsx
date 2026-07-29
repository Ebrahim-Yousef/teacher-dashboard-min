import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudents } from "../../hooks/useStudents";
import { Pencil, Trash2, SearchX, ChevronLeft } from "lucide-react";
import ConfirmDialog from "../ui/ConfirmDialog";

const StudentsTable = ({ onEditStudent }) => {
  const [studentToDelete, setStudentToDelete] = useState(null);

  const {
    students,
    paginatedStudents,
    currentPage = 1,
    itemsPerPage = 10,
    deleteStudent,
  } = useStudents();

  const navigate = useNavigate();

  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <>
      <div className="w-full rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-right border-collapse table-fixed min-w-xl">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/70 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="w-2 px-3 py-3 border-l border-primary/10">م</th>
                <th className="w-[31%] px-3 py-3 align-middle">اسم الطالب</th>
                <th className="w-[18%] px-3 py-3 align-middle">رقم الطالب</th>
                <th className="w-[18%] px-3 py-3 align-middle">
                  رقم ولي الأمر
                </th>
                <th className="w-[10%] px-2 py-3 align-middle">المرحلة</th>
                <th className="w-[10%] px-2 py-3 align-middle">الصف</th>
                <th className="w-[10%] px-2 py-3 text-center align-middle whitespace-nowrap">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {paginatedStudents.length > 0
                ? paginatedStudents.map((student, index) => {
                    const studentNumber = startIndex + index + 1;
                    return (
                      <tr
                        key={student.id}
                        onClick={() => navigate(`/students/${student.id}`)}
                        className="group cursor-pointer transition-colors duration-150 hover:bg-primary/2"
                      >
                        <td className="align-middle">
                          <div className="flex items-center px-1.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-50 text-xs font-semibold font-mono text-slate-600 group-hover:bg-primary/8 group-hover:text-primary transition-colors">
                              {studentNumber}
                            </span>
                          </div>
                        </td>
                        <td className="px-2 py-2.5 align-middle">
                          <div className="flex items-center">
                            <span
                              className="font-semibold text-slate-800 truncate"
                              title={student.name}
                            >
                              {student.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 align-middle font-mono text-xs text-slate-600 truncate">
                          <span dir="ltr" className="inline-block truncate">
                            {student.studentPhone || "—"}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 align-middle font-mono text-xs text-slate-600 truncate">
                          <span dir="ltr" className="inline-block truncate">
                            {student.parentPhone || "—"}
                          </span>
                        </td>
                        <td className="px-2 py-2.5 align-middle whitespace-nowrap ">
                          <span className="inline-flex items-center text-xs font-medium">
                            {student.stage}
                          </span>
                        </td>
                        <td className="px-1.5 py-2.5 align-middle whitespace-nowrap">
                          <span className="inline-flex items-center text-xs font-medium">
                            {student.grade}
                          </span>
                        </td>
                        <td
                          onClick={(e) => e.stopPropagation()}
                          className="px-1.5 py-2.5 text-center align-middle whitespace-nowrap"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => onEditStudent(student)}
                              className="rounded-md p-1.5 text-slate-400 bg-primary-light hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                              title="تعديل الطالب"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setStudentToDelete(student)}
                              className="rounded-md p-1.5 text-slate-400 bg-red-50 hover:text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                              title="حذف الطالب"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
        <div className="block md:hidden divide-y divide-slate-100">
          {paginatedStudents.length > 0 &&
            paginatedStudents.map((student, index) => {
              const studentNumber = startIndex + index + 1;
              return (
                <div
                  key={student.id}
                  onClick={() => navigate(`/students/${student.id}`)}
                  className="p-3 flex flex-col gap-2.5 hover:bg-slate-50/80 transition-colors active:bg-slate-100 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 text-xs font-semibold font-mono text-slate-600">
                        {studentNumber}
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-slate-800 text-xs truncate">
                          {student.name}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-0.5 text-xs">
                          <span className="font-medium text-primary">
                            {student.stage}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-slate-500">
                            {student.grade}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronLeft
                      size={16}
                      className="text-slate-400 shrink-0"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs pt-0.5">
                    <div className="bg-slate-50 px-2 py-1.5 rounded-md border border-slate-100">
                      <span className="text-xs text-slate-400 block mb-0.5">
                        رقم الطالب
                      </span>
                      <span
                        className="font-mono text-slate-700 truncate block"
                        dir="ltr"
                      >
                        {student.studentPhone || "—"}
                      </span>
                    </div>
                    <div className="bg-slate-50 px-2 py-1.5 rounded-md border border-slate-100">
                      <span className="text-xs text-slate-400 block mb-0.5">
                        رقم ولي الأمر
                      </span>
                      <span
                        className="font-mono text-slate-700 truncate block"
                        dir="ltr"
                      >
                        {student.parentPhone || "—"}
                      </span>
                    </div>
                  </div>
                  <div
                    className="flex items-center justify-end gap-2 pt-1.5 border-t border-slate-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => onEditStudent(student)}
                      className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      <Pencil size={14} />
                      <span>تعديل</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStudentToDelete(student)}
                      className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={14} />
                      <span>حذف</span>
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        {paginatedStudents.length === 0 && (
          <div className="px-4 py-12 text-center">
            <div className="flex flex-col items-center justify-center gap-2.5 text-slate-400">
              <div className="p-3 bg-slate-100 rounded-xl text-slate-400">
                <SearchX size={28} strokeWidth={1.5} />
              </div>
              <div className="max-w-xs space-y-1">
                <p className="text-xs font-semibold text-slate-700">
                  {students.length === 0
                    ? "لا يوجد طلاب مسجلون حتى الآن"
                    : "لا توجد نتائج مطابقة لبحثك"}
                </p>
                <p className="text-xs text-slate-400">
                  {students.length === 0
                    ? "قم بإضافة طالب جديد لبدء إدارة القائمة."
                    : "تأكد من صحة الاسم أو قم بتغيير الفلاتر."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <ConfirmDialog
        isOpen={!!studentToDelete}
        onClose={() => setStudentToDelete(null)}
        onConfirm={() => {
          if (studentToDelete) {
            deleteStudent(studentToDelete.id);
            setStudentToDelete(null);
          }
        }}
        title="حذف الطالب"
        message={`هل أنت متأكد من رغبتك في حذف الطالب "${studentToDelete?.name}"؟ لا يمكن التراجع عن هذا الإجراء.`}
      />
    </>
  );
};

export default StudentsTable;

import { useState, useEffect, useCallback } from "react";
import { StudentsContext } from "./StudentsContext";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../hooks/useAuth";
import {
  getStudentsApi,
  getStudentByIdApi,
  createStudentApi,
  updateStudentApi,
  deleteStudentApi,
} from "../../services/students";

export const StudentsProvider = ({ children }) => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // حالة الفلترة والترقيم
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // قراءة القيمة الأولية لعدد العناصر من localStorage
  const [studentsPerPage, setStudentsPerPage] = useState(() => {
    const savedPerPage = localStorage.getItem("studentsPerPage");
    return savedPerPage ? Number(savedPerPage) : 10;
  });

  const [totalStudents, setTotalStudents] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // 1. تطبيق Debounce على البحث لتجنب الكثرة من الطلبات
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 2. جلب البيانات من الـ Backend
  const fetchStudents = useCallback(async () => {
    if (!user) {
      setStudents([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const res = await getStudentsApi({
        page: currentPage,
        limit: studentsPerPage,
        search: debouncedSearchTerm,
        stage: selectedStage,
        grade: selectedGrade,
      });

      if (res?.success) {
        setStudents(res.data || []);
        if (res.meta) {
          setTotalStudents(res.meta.total ?? 0);
          setTotalPages(res.meta.totalPages ?? 1);
        }
      } else {
        const errorMsg =
          res?.error?.message || "حدث خطأ أثناء جلب قائمة الطلاب";
        showToast(errorMsg, "error");
      }
    } catch {
      showToast("تعذر الاتصال بالخادم، يرجى المحاولة لاحقاً", "error");
    } finally {
      setLoading(false);
    }
  }, [
    user,
    currentPage,
    studentsPerPage,
    debouncedSearchTerm,
    selectedStage,
    selectedGrade,
    showToast,
  ]);

  // 3. استدعاء آمن لمنع تحذيرات ESLint وتفادي الـ Cascading Renders
  useEffect(() => {
    let ignore = false;

    Promise.resolve().then(() => {
      if (!ignore) {
        fetchStudents();
      }
    });

    return () => {
      ignore = true;
    };
  }, [fetchStudents]);

  // جلب طالب واحد بواسطة الـ ID
  const getStudentById = async (id) => {
    try {
      const res = await getStudentByIdApi(id);
      if (res?.success) {
        return { success: true, data: res.data };
      }
      return { success: false, error: res?.error };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || {
          message: "فشل جلب بيانات الطالب",
        },
      };
    }
  };

  // التحكم بالبحث والفلاتر
  const handleSearchChange = (value) => {
    setSearchTerm(typeof value === "string" ? value : "");
    setCurrentPage(1);
  };

  const handleStageChange = (value) => {
    setSelectedStage(value || "");
    setSelectedGrade("");
    setCurrentPage(1);
  };

  const handleGradeChange = (value) => {
    setSelectedGrade(value || "");
    setCurrentPage(1);
  };

  const handleLimitChange = (limit) => {
    const parsedLimit = Number(limit);
    setStudentsPerPage(parsedLimit);
    localStorage.setItem("studentsPerPage", String(parsedLimit));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedStage("");
    setSelectedGrade("");
    setCurrentPage(1);
  };

  // إنشاء طالب جديد
  const createStudent = async (studentData) => {
    try {
      const res = await createStudentApi(studentData);
      if (res?.success) {
        showToast("تمت إضافة الطالب بنجاح", "success");
        await fetchStudents();
        return { success: true, data: res.data };
      }
      const errorMsg = res?.error?.message || "فشل إضافة الطالب";
      showToast(errorMsg, "error");
      return { success: false, error: res?.error };
    } catch (err) {
      const errorMsg =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        "فشل إضافة الطالب";
      showToast(errorMsg, "error");
      return { success: false, error: { message: errorMsg } };
    }
  };

  // 🛠️ تحديث بيانات طالب (شامل تنظيف البيانات المدخلة وتمرير الـ ID بأمان)
  const updateStudent = async (idOrData, studentData) => {
    let targetId = idOrData;
    let rawPayload = studentData;
    // حالة 1: تمرير كائن البيانات كاملاً كمعامل أول
    if (typeof idOrData === "object" && idOrData !== null) {
      targetId = idOrData.id || idOrData._id;
      rawPayload = { ...idOrData };
    }
    if (!targetId) {
      showToast("تعذر تحديد معرف الطالب المراد تعديله", "error");
      return { success: false, error: { message: "معرف الطالب مفقود" } };
    }
    // تنظيف البيانات الحساسة وغير التابعة للـ Body قبل التعديل
    const payload = { ...rawPayload };
    delete payload.id;
    delete payload._id;
    delete payload.createdAt;
    delete payload.updatedAt;
    delete payload.__v;

    try {
      const res = await updateStudentApi(targetId, payload);
      if (res?.success) {
        showToast("تم تحديث بيانات الطالب بنجاح", "success");
        await fetchStudents();
        return { success: true, data: res.data };
      }
      const errorMsg = res?.error?.message || "فشل تحديث بيانات الطالب";
      showToast(errorMsg, "error");
      return { success: false, error: res?.error };
    } catch (err) {
      const errorMsg =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        "فشل تحديث بيانات الطالب";
      showToast(errorMsg, "error");
      return { success: false, error: { message: errorMsg } };
    }
  };

  // حذف طالب
  const deleteStudent = async (id) => {
    try {
      const res = await deleteStudentApi(id);
      if (res?.success) {
        showToast("تم حذف الطالب بنجاح", "success");
        await fetchStudents();
        return { success: true };
      }
      const errorMsg = res?.error?.message || "فشل حذف الطالب";
      showToast(errorMsg, "error");
      return { success: false, error: res?.error };
    } catch (err) {
      const errorMsg =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        "فشل حذف الطالب";
      showToast(errorMsg, "error");
      return { success: false, error: { message: errorMsg } };
    }
  };

  return (
    <StudentsContext.Provider
      value={{
        students,
        loading,
        fetchStudents,
        getStudentById,
        createStudent,
        updateStudent,
        deleteStudent,
        searchTerm,
        setSearchTerm: handleSearchChange,
        selectedStage,
        setSelectedStage: handleStageChange,
        selectedGrade,
        setSelectedGrade: handleGradeChange,
        currentPage,
        setCurrentPage,
        studentsPerPage,
        setStudentsPerPage: handleLimitChange,
        totalPages,
        totalStudents,
        clearFilters,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentsProvider;

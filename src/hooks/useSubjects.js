import { useState, useEffect, useCallback } from "react";
import * as subjectService from "../services/subjects";
import { useToast } from "./useToast";

export const useSubjects = (isActiveFilter) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const fetchSubjects = useCallback(async () => {
    try {
      setLoading(true);
      const res = await subjectService.getSubjects(isActiveFilter);
      if (res.success) {
        setSubjects(res.data || []);
        setError(null);
      }
    } catch (err) {
      const msg =
        err.response?.data?.error?.message ||
        "حدث خطأ أثناء تحميل قائمة المواد الدراسية";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  }, [isActiveFilter, showToast]);

  // التحميل الأولي عند فتح الصفحة بدون تحذيرات ESLint
  useEffect(() => {
    let isSubscribed = true;

    const loadData = async () => {
      try {
        const res = await subjectService.getSubjects(isActiveFilter);
        if (isSubscribed && res.success) {
          setSubjects(res.data || []);
          setError(null);
        }
      } catch (err) {
        if (isSubscribed) {
          const msg =
            err.response?.data?.error?.message ||
            "حدث خطأ أثناء تحميل قائمة المواد الدراسية";
          setError(msg);
          showToast(msg, "error");
        }
      } finally {
        if (isSubscribed) setLoading(false);
      }
    };

    loadData();

    return () => {
      isSubscribed = false;
    };
  }, [isActiveFilter, showToast]);

  const executeAction = async (actionFn, successMsg, failMsg) => {
    try {
      const res = await actionFn();
      if (res.success) {
        await fetchSubjects();
        showToast(successMsg, "success");
        return { success: true };
      }
      return { success: false, error: res.error };
    } catch (err) {
      const msg = err.response?.data?.error?.message || failMsg;
      showToast(msg, "error");
      return {
        success: false,
        error: err.response?.data?.error || { message: msg },
      };
    }
  };

  return {
    subjects,
    loading,
    error,
    refetch: fetchSubjects,
    addSubject: (data) =>
      executeAction(
        () => subjectService.createSubject(data),
        "تمت إضافة المادة الدراسية بنجاح",
        "فشل إضافة المادة الدراسية",
      ),
    editSubject: (id, data) =>
      executeAction(
        () => subjectService.updateSubject(id, data),
        "تم تحديث المادة الدراسية بنجاح",
        "فشل تعديل المادة الدراسية",
      ),
    removeSubject: (id) =>
      executeAction(
        () => subjectService.deleteSubject(id),
        "تم حذف المادة الدراسية بنجاح",
        "فشل حذف المادة الدراسية",
      ),
    addBranch: (subjectId, data) =>
      executeAction(
        () => subjectService.createBranch(subjectId, data),
        "تمت إضافة الفرع بنجاح",
        "فشل إضافة الفرع",
      ),
    editBranch: (subjectId, branchId, data) =>
      executeAction(
        () => subjectService.updateBranch(subjectId, branchId, data),
        "تم تعديل الفرع بنجاح",
        "فشل تعديل الفرع",
      ),
    removeBranch: (subjectId, branchId) =>
      executeAction(
        () => subjectService.deleteBranch(subjectId, branchId),
        "تم حذف الفرع بنجاح",
        "فشل حذف الفرع",
      ),
  };
};

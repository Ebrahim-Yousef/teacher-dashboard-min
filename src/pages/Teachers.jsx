import { useState, useEffect, useCallback } from "react";
import {
  UserPlus,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { getTeachersApi, createTeacherApi } from "../services/admin";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // حالات فتح ونموذج إضافة معلم
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    isActive: true,
  });

  // تعريف دالة جلب البيانات بنطاق عام للمكون
  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getTeachersApi();
      if (res.success) {
        setTeachers(res.data || []);
      } else {
        setError(res.error?.message || "حدث خطأ أثناء جلب البيانات");
      }
    } catch {
      setError("تعذر الاتصال بالخادم، يرجى المحاولة لاحقاً");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getTeachersApi();
        if (isMounted) {
          if (res.success) {
            setTeachers(res.data || []);
          } else {
            setError(res.error?.message || "حدث خطأ أثناء جلب البيانات");
          }
        }
      } catch {
        if (isMounted) {
          setError("تعذر الاتصال بالخادم، يرجى المحاولة لاحقاً");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (formError) setFormError("");
  };

  const handleCreateTeacher = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.username || !formData.password) {
      setFormError("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      const res = await createTeacherApi(formData);
      if (res.success) {
        setIsModalOpen(false);
        setFormData({ name: "", username: "", password: "", isActive: true });
        await fetchTeachers(); // إعادة جلب البيانات
      } else {
        setFormError(res.error?.message || "فشل إنشاء حساب المعلم");
      }
    } catch {
      setFormError("حدث خطأ أثناء الاتصال بالخادم");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStatusBadge = (status) => {
    const uppercaseStatus = status?.toUpperCase();
    switch (uppercaseStatus) {
      case "ACTIVE":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
            <CheckCircle2 size={12} /> نشط
          </span>
        );
      case "UNPAID":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">
            <Clock size={12} /> غير مدفوع
          </span>
        );
      case "EXPIRED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200">
            <AlertCircle size={12} /> منتهي
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            غير محدد
          </span>
        );
    }
  };

  return (
    <div className="p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            إدارة المعلمين والاشتراكات
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            عرض وتعيين المعلمين وإدارة حالة الاشتراكات المنصة
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={fetchTeachers}
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            تحديث
          </Button>

          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2"
          >
            <UserPlus size={18} />
            إضافة معلم جديد
          </Button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-2xl text-red-600 bg-red-50 border border-red-200 text-sm font-semibold">
          {error}
        </div>
      )}

      {/* Teachers Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full text-right text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-500 border-b border-slate-100">
            <tr>
              <th className="p-4">اسم المعلم</th>
              <th className="p-4">اسم المستخدم</th>
              <th className="p-4">حالة الاشتراك</th>
              <th className="p-4">تاريخ الانتهاء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-400">
                  جاري تحميل البيانات...
                </td>
              </tr>
            ) : teachers.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-400">
                  لا يوجد معلمون مسجلون حالياً
                </td>
              </tr>
            ) : (
              teachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="p-4 font-medium text-slate-900">
                    {teacher.name}
                  </td>
                  <td className="p-4">{teacher.username}</td>
                  <td className="p-4">
                    {renderStatusBadge(teacher.subscription?.status)}
                  </td>
                  <td className="p-4">
                    {teacher.subscription?.expiresAt
                      ? new Date(
                          teacher.subscription.expiresAt,
                        ).toLocaleDateString("ar-EG")
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Teacher Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="إضافة معلم جديد"
      >
        <form onSubmit={handleCreateTeacher} className="space-y-4">
          <Input
            label="اسم المعلم"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="أدخل الاسم الكامل"
            required
          />

          <Input
            label="اسم المستخدم"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="أدخل اسم المستخدم لتسجيل الدخول"
            required
          />

          <Input
            label="كلمة المرور"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="أدخل كلمة المرور"
            required
          />

          {formError && (
            <div className="p-3 text-xs rounded-xl bg-red-50 text-red-600 border border-red-200 font-semibold">
              {formError}
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              إلغاء
            </Button>
            <Button type="submit" variant="primary" loading={isSubmitting}>
              إنشاء وتفعيل
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminTeachers;

import { useState, useMemo } from "react";
import { useSubjects } from "../hooks/useSubjects";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import Spinner from "../components/ui/Spinner";
import {
  BookOpen,
  Plus,
  Pencil,
  Trash2,
  GitBranch,
  AlertCircle,
  FolderPlus,
  CheckCircle2,
  XCircle,
  Layers,
} from "lucide-react";

const Subjects = () => {
  const {
    subjects,
    loading,
    error,
    addSubject,
    editSubject,
    toggleSubjectStatus,
    removeSubject,
    addBranch,
    editBranch,
    removeBranch,
  } = useSubjects();

  // الفلترة الحالية: 'all' | 'active' | 'inactive'
  const [filter, setFilter] = useState("all");

  const [subjectModalOpen, setSubjectModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [subjectName, setSubjectName] = useState("");
  const [subjectActive, setSubjectActive] = useState(true);

  const [branchModalOpen, setBranchModalOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [editingBranch, setEditingBranch] = useState(null);
  const [branchName, setBranchName] = useState("");

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // تصفية المواد حسب حالة الفلتر
  const filteredSubjects = useMemo(() => {
    if (filter === "active")
      return subjects.filter((s) => s.isActive !== false);
    if (filter === "inactive")
      return subjects.filter((s) => s.isActive === false);
    return subjects;
  }, [subjects, filter]);

  // الإحصائيات للأزرار
  const counts = useMemo(() => {
    const activeCount = subjects.filter((s) => s.isActive !== false).length;
    return {
      all: subjects.length,
      active: activeCount,
      inactive: subjects.length - activeCount,
    };
  }, [subjects]);

  const handleOpenSubjectModal = (subject = null) => {
    setFormError("");
    if (subject) {
      setEditingSubject(subject);
      setSubjectName(subject.name);
      setSubjectActive(subject.isActive ?? true);
    } else {
      setEditingSubject(null);
      setSubjectName("");
      setSubjectActive(true);
    }
    setSubjectModalOpen(true);
  };

  const handleSaveSubject = async (e) => {
    e.preventDefault();
    if (!subjectName.trim()) {
      setFormError("اسم المادة مطلوب");
      return;
    }

    setSubmitting(true);
    setFormError("");

    const res = editingSubject
      ? await editSubject(editingSubject.id, {
          name: subjectName.trim(),
          isActive: subjectActive,
        })
      : await addSubject({
          name: subjectName.trim(),
          isActive: subjectActive,
        });

    setSubmitting(false);
    if (res.success) setSubjectModalOpen(false);
    else setFormError(res.error?.message || "حدث خطأ أثناء حفظ المادة");
  };

  const handleOpenBranchModal = (subjectId, branch = null) => {
    setFormError("");
    setSelectedSubjectId(subjectId);
    if (branch) {
      setEditingBranch(branch);
      setBranchName(branch.name);
    } else {
      setEditingBranch(null);
      setBranchName("");
    }
    setBranchModalOpen(true);
  };

  const handleSaveBranch = async (e) => {
    e.preventDefault();
    if (!branchName.trim()) {
      setFormError("اسم الفرع مطلوب");
      return;
    }

    setSubmitting(true);
    setFormError("");

    const res = editingBranch
      ? await editBranch(selectedSubjectId, editingBranch.id, {
          name: branchName.trim(),
        })
      : await addBranch(selectedSubjectId, {
          name: branchName.trim(),
        });

    setSubmitting(false);
    if (res.success) setBranchModalOpen(false);
    else setFormError(res.error?.message || "حدث خطأ أثناء حفظ الفرع");
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setSubmitting(true);
    const res =
      deleteTarget.type === "subject"
        ? await removeSubject(deleteTarget.subjectId)
        : await removeBranch(deleteTarget.subjectId, deleteTarget.branchId);

    setSubmitting(false);
    if (res.success) setDeleteTarget(null);
  };

  return (
    <div
      className="w-full space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-4"
      dir="rtl"
    >
      {/* هيدر الصفحة */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shrink-0">
            <BookOpen size={20} />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900">
              إدارة المواد الدراسية
            </h1>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              إضافة وتعديل المواد الدراسية والفروع التابعة لها
            </p>
          </div>
        </div>
        <Button
          onClick={() => handleOpenSubjectModal()}
          variant="primary"
          size="md"
          className="w-full sm:w-auto gap-2 shrink-0 text-xs font-semibold rounded-xl"
        >
          <Plus size={16} />
          <span>إضافة مادة جديدة</span>
        </Button>
      </div>

      {/* شريط الفلترة */}
      {!loading && !error && subjects.length > 0 && (
        <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 w-fit">
          <button
            onClick={() => setFilter("all")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
              filter === "all"
                ? "bg-white text-slate-900 shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900 font-medium"
            }`}
          >
            <Layers size={14} />
            <span>الكل</span>
            <span
              className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                filter === "all"
                  ? "bg-slate-100 text-slate-700"
                  : "bg-slate-200/70 text-slate-500"
              }`}
            >
              {counts.all}
            </span>
          </button>

          <button
            onClick={() => setFilter("active")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
              filter === "active"
                ? "bg-white text-emerald-700 shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900 font-medium"
            }`}
          >
            <CheckCircle2
              size={14}
              className={
                filter === "active" ? "text-emerald-600" : "text-slate-400"
              }
            />
            <span>المفعلة</span>
            <span
              className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                filter === "active"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-200/70 text-slate-500"
              }`}
            >
              {counts.active}
            </span>
          </button>

          <button
            onClick={() => setFilter("inactive")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
              filter === "inactive"
                ? "bg-white text-slate-800 shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900 font-medium"
            }`}
          >
            <XCircle
              size={14}
              className={
                filter === "inactive" ? "text-slate-700" : "text-slate-400"
              }
            />
            <span>المعطلة</span>
            <span
              className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                filter === "inactive"
                  ? "bg-slate-200 text-slate-700"
                  : "bg-slate-200/70 text-slate-500"
              }`}
            >
              {counts.inactive}
            </span>
          </button>
        </div>
      )}

      {/* المحتوى الرئيسي */}
      {loading ? (
        <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-xs">
          <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
            <Spinner size={26} />
            <p className="text-xs font-medium text-slate-500">
              جاري تحميل المواد الدراسية...
            </p>
          </div>
        </div>
      ) : error ? (
        <div className="w-full rounded-2xl border border-red-200 bg-red-50/50 p-5 text-center text-red-600 flex flex-col items-center gap-2">
          <AlertCircle size={20} />
          <p className="text-xs font-medium">{error}</p>
        </div>
      ) : filteredSubjects.length === 0 ? (
        <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-10 text-center shadow-xs">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500 mb-3">
              <BookOpen size={22} />
            </div>
            <h3 className="text-sm font-bold text-slate-800">
              {filter === "all"
                ? "لا توجد مواد دراسية حتى الآن"
                : filter === "active"
                  ? "لا توجد مواد مفعلة حالياً"
                  : "لا توجد مواد معطلة"}
            </h3>
            <p className="mt-1 text-xs text-slate-500 max-w-xs font-normal">
              ابدأ بإضافة مادة دراسية وفروعها لتجهيز النظام.
            </p>
            {filter === "all" && (
              <Button
                onClick={() => handleOpenSubjectModal()}
                variant="primary"
                size="sm"
                className="mt-4 gap-2 text-xs rounded-xl"
              >
                <Plus size={14} />
                إضافة مادة جديدة
              </Button>
            )}
          </div>
        </div>
      ) : (
        /* قائمة المواد */
        <div className="w-full flex flex-col gap-3">
          {filteredSubjects.map((subj) => {
            const isActive = subj.isActive !== false;
            return (
              <div
                key={subj.id}
                className="w-full rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-2xs hover:border-slate-300 transition-all duration-200 space-y-4"
              >
                {/* رأس المادة */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 shrink-0">
                      <BookOpen size={16} />
                    </div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm sm:text-base font-bold text-slate-800">
                        {subj.name}
                      </h3>

                      {/* زر حالة المادة (Switch Style) */}
                      <button
                        type="button"
                        onClick={() => toggleSubjectStatus(subj.id, isActive)}
                        title={isActive ? "تعطيل المادة" : "تفعيل المادة"}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium cursor-pointer transition-all select-none border ${
                          isActive
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200/60 hover:bg-emerald-100/80"
                            : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200/60"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? "bg-emerald-500" : "bg-slate-400"
                          }`}
                        />
                        <span>{isActive ? "نشط" : "معطل"}</span>
                      </button>
                    </div>
                  </div>

                  {/* أدوات التحكم بالتحرير والحذف */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenSubjectModal(subj)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="تعديل المادة"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteTarget({
                          type: "subject",
                          subjectId: subj.id,
                          name: subj.name,
                        })
                      }
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="حذف المادة"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* قسم الفروع */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <GitBranch size={14} className="text-slate-400" />
                      <span>
                        الفروع الدراسية ({subj.branches?.length || 0})
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenBranchModal(subj.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      <FolderPlus size={13} />
                      <span>إضافة فرع</span>
                    </button>
                  </div>

                  {subj.branches && subj.branches.length > 0 ? (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {subj.branches.map((b) => (
                        <div
                          key={b.id}
                          className="inline-flex items-center gap-2 pl-2 pr-3 py-1 rounded-lg bg-slate-50 border border-slate-200/70 text-xs text-slate-700 hover:border-slate-300 transition-all"
                        >
                          <span>{b.name}</span>
                          <div className="flex items-center gap-1 border-r border-slate-200 pr-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenBranchModal(subj.id, b)}
                              className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                              title="تعديل الفرع"
                            >
                              <Pencil size={12} />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setDeleteTarget({
                                  type: "branch",
                                  subjectId: subj.id,
                                  branchId: b.id,
                                  name: b.name,
                                })
                              }
                              className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                              title="حذف الفرع"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-400 pt-0.5">
                      لا توجد فروع مضافة لهذه المادة بعد.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal المادة */}
      <Modal
        isOpen={subjectModalOpen}
        onClose={() => setSubjectModalOpen(false)}
        title={
          editingSubject ? "تعديل المادة الدراسية" : "إضافة مادة دراسية جديدة"
        }
      >
        <form onSubmit={handleSaveSubject} className="space-y-4">
          {formError && (
            <div className="p-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0 text-red-500" />
              <span>{formError}</span>
            </div>
          )}
          <Input
            label="اسم المادة الدراسية"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            placeholder="مثال: لغة عربية، رياضيات..."
            required
            disabled={submitting}
          />

          {/* مفتاح التبديل Switch داخل الـ Modal */}
          <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
            <div>
              <p className="text-xs font-bold text-slate-800">حالة المادة</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {subjectActive
                  ? "المادة مجهزة ومفعلة للاستخدام"
                  : "المادة معطلة حالياً"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSubjectActive((prev) => !prev)}
              disabled={submitting}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${
                subjectActive ? "bg-slate-900" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                  subjectActive ? "-translate-x-4.5" : "-translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setSubjectModalOpen(false)}
              disabled={submitting}
              className="rounded-xl text-xs"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={submitting}
              className="rounded-xl text-xs"
            >
              {submitting ? "جاري الحفظ..." : "حفظ المادة"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal الفرع */}
      <Modal
        isOpen={branchModalOpen}
        onClose={() => setBranchModalOpen(false)}
        title={editingBranch ? "تعديل الفرع الدراسي" : "إضافة فرع جديد"}
      >
        <form onSubmit={handleSaveBranch} className="space-y-4">
          {formError && (
            <div className="p-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0 text-red-500" />
              <span>{formError}</span>
            </div>
          )}
          <Input
            label="اسم الفرع الدراسي"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            placeholder="مثال: نحو، بلاغة، جبر..."
            required
            disabled={submitting}
          />
          <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setBranchModalOpen(false)}
              disabled={submitting}
              className="rounded-xl text-xs"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={submitting}
              className="rounded-xl text-xs"
            >
              {submitting ? "جاري الحفظ..." : "حفظ الفرع"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* تأكيد الحذف */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        isLoading={submitting}
        variant="danger"
        title={
          deleteTarget?.type === "subject" ? "حذف المادة الدراسية" : "حذف الفرع"
        }
        message={`هل أنت متأكد من رغبتك في حذف "${deleteTarget?.name}"؟ لا يمكن التراجع عن هذا الإجراء.`}
      />
    </div>
  );
};

export default Subjects;

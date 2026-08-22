import { useState } from "react";
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
} from "lucide-react";

const Subjects = () => {
  const {
    subjects,
    loading,
    error,
    addSubject,
    editSubject,
    removeSubject,
    addBranch,
    editBranch,
    removeBranch,
  } = useSubjects();

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
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800">
              إدارة المواد الدراسية
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              إضافة وتعديل المواد الدراسية والفروع التابعة لها
            </p>
          </div>
        </div>
        <Button
          onClick={() => handleOpenSubjectModal()}
          variant="primary"
          size="md"
          className="gap-2"
        >
          <Plus size={18} />
          <span>إضافة مادة جديدة</span>
        </Button>
      </div>

      {loading ? (
        <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-xs">
          <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
            <Spinner size={32} />
            <p className="text-xs font-semibold text-slate-600">
              جاري تحميل المواد الدراسية...
            </p>
          </div>
        </div>
      ) : error ? (
        <div className="w-full rounded-2xl border border-red-200 bg-red-50/50 p-6 text-center text-red-600 flex flex-col items-center gap-2">
          <AlertCircle size={24} />
          <p className="text-xs font-semibold">{error}</p>
        </div>
      ) : subjects.length === 0 ? (
        <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-xs">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-3.5 ring-8 ring-primary/5">
              <BookOpen size={26} />
            </div>
            <h3 className="text-sm font-bold text-slate-800">
              لا توجد مواد دراسية حتى الآن
            </h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm font-medium">
              ابدأ بإضافة أول مادة دراسية وفروعها لتجهيز النظام.
            </p>
            <Button
              onClick={() => handleOpenSubjectModal()}
              variant="primary"
              size="sm"
              className="mt-4 gap-2 text-xs"
            >
              <Plus size={14} />
              إضافة مادة جديدة
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((subj) => (
            <div
              key={subj.id}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-base font-bold text-slate-800">
                    {subj.name}
                  </h3>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      subj.isActive !== false
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                  >
                    {subj.isActive !== false ? "نشط" : "غير نشط"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpenSubjectModal(subj)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary-light transition-colors"
                    title="تعديل المادة"
                  >
                    <Pencil size={16} />
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
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="حذف المادة"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <GitBranch size={14} className="text-primary" />
                    <span>الفروع الدراسية ({subj.branches?.length || 0})</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenBranchModal(subj.id)}
                    className="flex items-center gap-1 text-primary hover:underline cursor-pointer"
                  >
                    <FolderPlus size={14} />
                    <span>إضافة فرع</span>
                  </button>
                </div>

                {subj.branches && subj.branches.length > 0 ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {subj.branches.map((b) => (
                      <div
                        key={b.id}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700"
                      >
                        <span>{b.name}</span>
                        <div className="flex items-center gap-1 border-r border-slate-200 mr-1 pr-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenBranchModal(subj.id, b)}
                            className="text-slate-400 hover:text-primary transition-colors"
                            title="تعديل الفرع"
                          >
                            <Pencil size={13} />
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
                            className="text-slate-400 hover:text-red-600 transition-colors"
                            title="حذف الفرع"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic pt-1">
                    لا توجد فروع مضافة لهذه المادة بعد.
                  </p>
                )}
              </div>
            </div>
          ))}
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
            <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0 text-red-500" />
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
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setSubjectModalOpen(false)}
              disabled={submitting}
            >
              إلغاء
            </Button>
            <Button type="submit" variant="primary" disabled={submitting}>
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
            <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0 text-red-500" />
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
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setBranchModalOpen(false)}
              disabled={submitting}
            >
              إلغاء
            </Button>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? "جاري الحفظ..." : "حفظ الفرع"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* حوار التأكيد المرن والديناميكي */}
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

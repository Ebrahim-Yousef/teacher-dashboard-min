import {
  PlusCircle,
  CheckCircle2,
  Trash2,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";

const toastStyles = {
  add: {
    bg: "bg-indigo-50 border-indigo-200 text-indigo-900",
    icon: <PlusCircle className="w-5 h-5 text-indigo-600 shrink-0" />,
  },
  edit: {
    bg: "bg-emerald-50 border-emerald-200 text-emerald-900",
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
  },
  success: {
    bg: "bg-emerald-50 border-emerald-200 text-emerald-900",
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
  },
  delete: {
    bg: "bg-red-50 border-red-200 text-red-900",
    icon: <Trash2 className="w-5 h-5 text-red-600 shrink-0" />,
  },
  error: {
    bg: "bg-red-50 border-red-200 text-red-900",
    icon: <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />,
  },
  warning: {
    bg: "bg-amber-50 border-amber-200 text-amber-900",
    icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
  },
  info: {
    bg: "bg-blue-50 border-blue-200 text-blue-900",
    icon: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
  },
};

// دالة ذكية لتخمين نوع التوست من نص الرسالة تلقائياً
const resolveToastType = (message, type) => {
  if (type && type !== "success") return type; // إذا تم تمرير نوع صريح استخدمه

  const text = message.toLowerCase();

  if (
    text.includes("إضافة") ||
    text.includes("اضافة") ||
    text.includes("أضيفت") ||
    text.includes("أضيف")
  ) {
    return "add";
  }
  if (
    text.includes("تعديل") ||
    text.includes("تحديث") ||
    text.includes("حفظ")
  ) {
    return "edit";
  }
  if (
    text.includes("حذف") ||
    text.includes("إزالة") ||
    text.includes("ازالة")
  ) {
    return "delete";
  }

  return type || "success";
};

const Toast = ({ id, message, type = "success", onClose }) => {
  const activeType = resolveToastType(message, type);
  const style = toastStyles[activeType] || toastStyles.success;

  return (
    <div
      dir="rtl"
      className={`flex items-center justify-between gap-3 min-w-72 max-w-md p-3.5 rounded-xl border shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 ${style.bg}`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {style.icon}
        <p className="text-xs font-bold truncate leading-relaxed">{message}</p>
      </div>
      <button
        type="button"
        onClick={() => onClose(id)}
        className="p-1 rounded-lg hover:bg-black/5 transition-colors text-slate-400 hover:text-slate-600 cursor-pointer"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default Toast;

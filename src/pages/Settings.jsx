import { useState } from "react";
import {
  Save,
  MessageSquareText,
  CheckCircle2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import BackButton from "../components/ui/BackButton";
import Button from "../components/ui/Button";

const Settings = () => {
  const defaultMessage = "أهلاً بك،";

  const [template, setTemplate] = useState(() => {
    return localStorage.getItem("whatsapp_template") || defaultMessage;
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("whatsapp_template", template);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    setTemplate(defaultMessage);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 pt-4 pb-8">
      <div className="flex items-center justify-between w-full">
        <BackButton to="/dashboard" />
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-light px-3.5 py-1 text-xs font-bold text-primary">
          <Sparkles size={13} />
          <span>إعدادات القوالب</span>
        </span>
      </div>
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xs">
        <div className="border-b border-slate-100 bg-slate-50/60 p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-md shadow-primary/30">
              <MessageSquareText size={22} />
            </div>
            <div className="space-y-1">
              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                تخصيص رسالة الواتساب
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                اكتب النص الافتراضي الذي ترغب في إرساله للطلاب أو أولياء الأمور
                عند التواصل عبر التراسل المباشر.
              </p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSave} className="p-6 sm:p-7 space-y-6">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-slate-800">
                قالب الرسالة
              </label>
              {template !== defaultMessage && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800"
                >
                  <RotateCcw size={13} />
                  <span>استعادة النمط الافتراضي</span>
                </Button>
              )}
            </div>
            <textarea
              rows={6}
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              placeholder="اكتب نص الرسالة هنا..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/40 p-4 text-sm leading-relaxed text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-3 focus:ring-primary/15"
            />
          </div>
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-5">
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full sm:w-auto"
            >
              <Save size={18} />
              <span>حفظ التعديلات</span>
            </Button>
            {savedSuccess && (
              <div className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>تم حفظ القالب بنجاح!</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;

import { getWhatsAppLink } from "../../utils/whatsapp";
import {
  Phone,
  MessageCircle,
  Edit,
  GraduationCap,
  School,
  User,
} from "lucide-react";
import Button from "../ui/Button";

const StudentInfoCard = ({ student, onEdit }) => {
  const initials =
    student?.name
      ?.trim()
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join(" ")
      .toUpperCase() || "";

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm text-center">
      <div className="flex flex-col items-center">
        <div
          className="
            flex
            h-20
            w-20
            sm:h-24
            sm:w-24
            items-center
            justify-center
            rounded-full
            bg-primary
            text-2xl
            sm:text-3xl
            font-extrabold
            text-white
            shadow-md
            shadow-primary/25
            ring-4
            ring-primary-light
            select-none
          "
        >
          {initials}
        </div>
        <h1 className="mt-4 text-xl sm:text-2xl font-bold text-slate-900">
          {student.name}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium flex items-center gap-1.5 justify-center">
          <User size={15} className="text-primary" />
          <span>طالب مسجل</span>
        </p>
      </div>
      <hr className="my-6 border-slate-100" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 transition-all hover:border-primary/30">
          <p className="text-xs font-semibold text-slate-400">هاتف الطالب</p>
          <div className="mt-2 flex items-center justify-between">
            <span
              className="font-mono text-sm font-bold text-slate-800"
              dir="ltr"
            >
              {student.studentPhone}
            </span>
            <div className="flex items-center gap-2">
              <a
                href={getWhatsAppLink(student.studentPhone)}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary-light text-secondary transition-all hover:bg-secondary hover:text-white shadow-2xs"
                title="تواصل عبر واتساب"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href={`tel:${student.studentPhone}`}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-200/70 text-slate-700 transition-all hover:bg-slate-800 hover:text-white shadow-2xs"
                title="اتصال تلفوني"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 transition-all hover:border-primary/30">
          <p className="text-xs font-semibold text-slate-400">هاتف ولي الأمر</p>
          <div className="mt-2 flex items-center justify-between">
            <span
              className="font-mono text-sm font-bold text-slate-800"
              dir="ltr"
            >
              {student.parentPhone}
            </span>
            <div className="flex items-center gap-2">
              <a
                href={getWhatsAppLink(student.parentPhone)}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary-light text-secondary transition-all hover:bg-secondary hover:text-white shadow-2xs"
                title="تواصل عبر واتساب"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href={`tel:${student.parentPhone}`}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-200/70 text-slate-700 transition-all hover:bg-slate-800 hover:text-white shadow-2xs"
                title="اتصال تلفوني"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
        <div className="rounded-2xl border border-primary/10 bg-primary-light/50 p-4">
          <p className="text-xs font-semibold text-slate-500">
            المرحلة الدراسية
          </p>
          <div className="mt-1.5 flex items-center gap-2 text-primary font-bold text-sm sm:text-base">
            <GraduationCap size={18} />
            <span>{student.stage}</span>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4">
          <p className="text-xs font-semibold text-slate-500">الصف الدراسي</p>
          <div className="mt-1.5 flex items-center gap-2 text-slate-800 font-bold text-sm sm:text-base">
            <School size={18} className="text-slate-500" />
            <span>{student.grade}</span>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-2">
        <Button
          onClick={onEdit}
          variant="primary"
          size="lg"
          className="w-full flex items-center justify-center gap-2"
        >
          <Edit size={18} />
          <span>تعديل بيانات الطالب</span>
        </Button>
      </div>
    </div>
  );
};

export default StudentInfoCard;

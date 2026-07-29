import { Menu, GraduationCap } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Header = ({ onMenuToggle }) => {
  const { user } = useAuth();
  const initials =
    user?.name
      ?.trim()
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "م";

  return (
    <header
      className="
        sticky top-0 z-30
        flex
        h-16
        items-center
        justify-between
        border-b
        border-slate-200/80
        bg-white/90
        px-4 sm:px-6 lg:px-8
        shadow-2xs
        backdrop-blur-md
      "
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="
            flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 lg:hidden
            hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer
          "
          title="القائمة"
        >
          <Menu size={20} />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-primary font-bold text-base">
          <GraduationCap size={22} className="text-primary" />
          <span>منصة المعلم</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-primary
            text-sm
            font-bold
            text-white
            shadow-xs
            shadow-primary/30
            select-none
            ring-2
            ring-primary-light
          "
        >
          {initials}
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-xs font-semibold text-slate-800">{user?.name}</p>
          <p className="text-[11px] text-slate-500">لوحة تحكم المدرس</p>
        </div>
      </div>
    </header>
  );
};

export default Header;

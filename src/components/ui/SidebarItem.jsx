import { NavLink } from "react-router-dom";
import { cn } from "../../styles/utils/cn";

const SidebarItem = ({ icon: Icon, label, to, onClick, danger = false }) => {
  const baseClasses =
    "flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer select-none w-full";
  const content = (
    <>
      <Icon className="shrink-0" size={20} />
      <span>{label}</span>
    </>
  );
  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          cn(
            baseClasses,
            isActive
              ? "bg-primary text-white shadow-sm shadow-primary/30"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
          )
        }
      >
        {content}
      </NavLink>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        baseClasses,
        danger
          ? "text-red-600 hover:bg-red-50 hover:text-red-700"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
      )}
    >
      {content}
    </button>
  );
};

export default SidebarItem;

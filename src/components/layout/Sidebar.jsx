import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Users, LogOut, Settings, GraduationCap, X } from "lucide-react";
import SidebarItem from "../ui/SidebarItem";
import ConfirmDialog from "../ui/ConfirmDialog";

const Sidebar = ({ isMobileOpen, onClose }) => {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { icon: Users, label: "إدارة الطلاب", to: "/dashboard" },
    { icon: Settings, label: "الإعدادات", to: "/settings" },
  ];

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full p-5">
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/30">
              <GraduationCap size={22} />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-base leading-tight">
                لوحة التحكم
              </h2>
              <p className="text-xs text-slate-500 font-medium">نظام المدرس</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex flex-col gap-2" onClick={() => onClose?.()}>
          {navItems.map((item) => (
            <SidebarItem
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
            />
          ))}
        </nav>
      </div>
      <div className="pt-4 border-t border-slate-100 space-y-2">
        <SidebarItem
          icon={LogOut}
          label="تسجيل الخروج"
          danger
          onClick={() => setIsLogoutDialogOpen(true)}
        />
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex flex-col h-screen w-64 bg-white border-l border-slate-200/80 shadow-2xs shrink-0">
        {sidebarContent}
      </aside>
      {isMobileOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}
      <aside
        className={`
          fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden
          ${isMobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {sidebarContent}
      </aside>
      <ConfirmDialog
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        onConfirm={handleConfirmLogout}
        title="تسجيل الخروج"
        message="هل أنت متأكد من رغبتك في تسجيل الخروج من النظام؟"
        confirmText="تسجيل الخروج"
        cancelText="تراجع"
        variant="danger"
      />
    </>
  );
};

export default Sidebar;

import { MessageCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64 bg-white shadow h-full p-4">
      <button className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-700 hover:bg-slate-100">
        <MessageCircle size={22} />
        <span>إعدادات الواتساب</span>
      </button>
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 rounded-lg px-4 py-3 text-red-600 hover:bg-red-50"
      >
        <LogOut size={22} />
        <span>تسجيل الخروج</span>
      </button>
    </aside>
  );
};

export default Sidebar;

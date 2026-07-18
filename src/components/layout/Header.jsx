import { UserCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white shadow flex items-center px-6">
      <div className="flex items-center gap-3">
        <UserCircle size={36} className="text-slate-600" />
        <span className="text-lg font-semibold text-slate-800">
          {user?.name}
        </span>
      </div>
    </header>
  );
};

export default Header;

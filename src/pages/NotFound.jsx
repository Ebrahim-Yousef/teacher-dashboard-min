import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import Button from "../components/ui/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      className="
        flex
        min-h-screen
        flex-col
        items-center
        justify-center
        gap-6
        bg-slate-50
        px-4
        text-center
      "
    >
      <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-warning-light text-warning shadow-lg shadow-warning/20">
        <AlertTriangle size={48} />
      </div>
      <div className="space-y-2">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
          الصفحة غير موجودة
        </h2>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          عذرًا، الصفحة التي تحاول الوصول إليها غير موجودة أو تم نقلها.
        </p>
      </div>
      <Button
        onClick={() => navigate("/dashboard")}
        variant="primary"
        size="lg"
      >
        العودة للوحة التحكم
      </Button>
    </div>
  );
};

export default NotFound;

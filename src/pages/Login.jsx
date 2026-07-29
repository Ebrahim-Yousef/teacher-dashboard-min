import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, GraduationCap, Eye, EyeOff } from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { validateLoginForm } from "../utils/validations/authValidation";
import { loginUser } from "../utils/auth";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    general: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateLoginForm({ ...formData });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const user = loginUser(formData.username, formData.password);
      if (!user) {
        setErrors({
          general: "اسم المستخدم أو كلمة المرور غير صحيحة",
        });
        setIsLoading(false);
        return;
      }
      login(user);
      navigate("/dashboard");
    }, 800);
  };

  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-slate-50 p-4 sm:p-6 lg:p-8"
    >
      <section className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-slate-100 transition-all">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary-light">
            <GraduationCap size={32} />
          </div>
        </div>
        <h1 className="text-center text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          لوحة تحكم المعلم
        </h1>
        <p className="mt-2 text-center text-xs sm:text-sm text-slate-500 font-medium">
          مرحبًا بعودتك! يرجى إدخال بيانات الاعتماد لتسجيل الدخول.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <Input
            icon={User}
            label="اسم المستخدم"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="أدخل اسم المستخدم"
            required
            error={errors.username}
          />
          <Input
            icon={Lock}
            type={showPassword ? "text" : "password"}
            label="كلمة المرور"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="أدخل كلمة المرور"
            required
            error={errors.password}
            rightActions={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-slate-400 hover:text-primary transition-colors cursor-pointer"
                title={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />
          {errors.general && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-center text-xs font-semibold text-red-600">
              {errors.general}
            </div>
          )}
          <Button
            type="submit"
            loading={isLoading}
            variant="primary"
            size="lg"
            className="w-full"
          >
            تسجيل الدخول
          </Button>
        </form>
      </section>
    </main>
  );
};

export default Login;

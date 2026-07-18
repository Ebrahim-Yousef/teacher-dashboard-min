import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";
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

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // console.log(formData);

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateLoginForm({ ...formData });
    const user = loginUser(formData.username, formData.password);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    login(user);
    navigate("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl text-white">
            🎓
          </div>
        </div>
        {/* Title */}
        <h1 className="text-center text-3xl font-bold text-slate-800">
          Teacher Dashboard
        </h1>
        {/* Subtitle */}
        <p className="mt-2 text-center text-sm text-slate-500">
          Welcome back! Please sign in to continue.
        </p>
        {/* Form */}
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
            type="password"
            label="كلمة المرور"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="أدخل كلمة المرور"
            required
            error={errors.password}
          />
          {errors.general && (
            <p className="text-center text-sm text-red-500">{errors.general}</p>
          )}
          <Button type="submit">دخول</Button>
        </form>
      </section>
    </main>
  );
};

export default Login;

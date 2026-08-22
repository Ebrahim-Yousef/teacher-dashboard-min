import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  // 1. إذا لم يكن المستخدم مسجلاً
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. التحقق من الصلاحيات حسب الدور
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const defaultRedirect =
      user.role === "super_admin" ? "/teachers" : "/dashboard";
    return <Navigate to={defaultRedirect} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

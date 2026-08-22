import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../layouts/AppLayout";
import { useAuth } from "../hooks/useAuth";
import { Loader2 } from "lucide-react";

const Login = lazy(() => import("../pages/Login"));
const AdminTeachers = lazy(() => import("../pages/Teachers"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Subjects = lazy(() => import("../pages/Subjects"));
const StudentDetails = lazy(() => import("../pages/StudentDetails"));
const Settings = lazy(() => import("../pages/Settings"));
const NotFound = lazy(() => import("../pages/NotFound"));

// مؤشر تحميل خفيف مخصص للـ Suspense في أجزاء معينة
const PageLoader = () => (
  <div className="flex h-[calc(100vh-80px)] w-full items-center justify-center">
    <div className="flex flex-col items-center gap-2">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="text-xs font-medium text-slate-500">جاري التحميل</span>
    </div>
  </div>
);

const AppRouter = () => {
  const { user } = useAuth();

  const getHomeRedirect = () => {
    if (!user) return "/login";
    return user.role === "super_admin" ? "/teachers" : "/dashboard";
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* مسار تسجيل الدخول */}
          <Route
            path="/login"
            element={
              user ? <Navigate to={getHomeRedirect()} replace /> : <Login />
            }
          />

          {/* المسار الرئيسي */}
          <Route
            path="/"
            element={<Navigate to={getHomeRedirect()} replace />}
          />

          {/* المسارات المحمية العامة */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/subjects" element={<Subjects />} />
            </Route>
            <Route path="/students/:id" element={<StudentDetails />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* المسارات المحمية للـ Super Admin */}
          <Route element={<ProtectedRoute allowedRoles={["super_admin"]} />}>
            <Route element={<AppLayout />}>
              <Route path="/teachers" element={<AdminTeachers />} />
            </Route>
          </Route>

          {/* صفحة 404 */}
          <Route
            path="*"
            element={user ? <NotFound /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;

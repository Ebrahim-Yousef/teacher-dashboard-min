import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../layouts/AppLayout";
import { useAuth } from "../hooks/useAuth";

const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const StudentDetails = lazy(() => import("../pages/StudentDetails"));
const Settings = lazy(() => import("../pages/Settings"));
const NotFound = lazy(() => import("../pages/NotFound"));

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50 text-indigo-600 font-bold">
    جاري التحميل...
  </div>
);

const AppRouter = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" replace /> : <Login />}
          />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/students/:id" element={<StudentDetails />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
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

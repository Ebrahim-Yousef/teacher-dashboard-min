// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "../pages/Login";
// import Dashboard from "../pages/Dashboard";
// import AppLayout from "../layouts/AppLayout";
// import { useAuth } from "../hooks/useAuth";

// const AppRouter = () => {
//   const { user } = useAuth();
//   console.log(!!user);

//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           {/* Public Route */}
//           <Route
//             path="/"
//             element={
//               user ? (
//                 <Navigate to="/dashboard" replace />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />
//           <Route
//             path="/login"
//             element={user ? <Navigate to="/dashboard" replace /> : <Login />}
//           />
//           {/* Protected Routes */}

//           <Route
//             path="/dashboard"
//             element={
//               <AppLayout>
//                 {user ? <Dashboard /> : <Navigate to="/login" replace />}
//               </AppLayout>
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default AppRouter;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../hooks/useAuth";

const AppRouter = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <Login />}
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>

        {/* Default Route */}
        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

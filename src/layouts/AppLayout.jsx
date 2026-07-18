import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

const AppLayout = () => {
  return (
    <div className="h-screen overflow-hidden bg-slate-100">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          {" "}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
